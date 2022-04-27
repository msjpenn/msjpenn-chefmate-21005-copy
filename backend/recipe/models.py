import uuid

from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.db.models.fields.related import ForeignKey
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.models import TimeStampedModel

from core.utils import generate_recipe_file_name
from home.models import OPTIONAL
from home.utils.upload_path import get_upload_path


class BaseModel(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Recipe(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True
    )
    title = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    picture = models.ImageField(
        upload_to=generate_recipe_file_name, blank=True, null=True
    )
    description = models.TextField(blank=True, null=True, max_length=255)
    recreated_from = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_recreated_from",
        db_index=True,
    )
    is_draft = models.BooleanField(default=True)
    total_hours_to_make = models.CharField(
        max_length=50, null=True, blank=True)
    serving_size = models.CharField(**OPTIONAL, max_length=50)

    class Meta:
        verbose_name = "Recipe"
        verbose_name_plural = "Recipes"
        ordering = [
            "-created_at",
        ]

    def __unicode__(self):
        return "%s" % self.title

    def __str__(self):
        return f"{self.title}"

    def create_ingredients_annd_instructions(self, ingredients, instructions):
        if ingredients and instructions:
            ingredients_list = []
            recipe_section = RecipeSection.objects.create(
                recipe=self, name=self.title)

            for ingredient in ingredients:
                unit = ingredient.get("unit")
                other_field = ""

                # Check if unit selected was other unit
                if unit == "other unit":
                    unit = Ingredient.UNIT_OTHER
                    other_field = ingredient.get("other_unit")

                ingredients_list.append(
                    Ingredient(
                        section=recipe_section,
                        name=ingredient.get("name"),
                        amount=ingredient.get("amount"),
                        unit=unit,
                        other_field=other_field,
                    )
                )

            Ingredient.objects.bulk_create(ingredients_list)
            RecipeInstruction.objects.create(
                section=recipe_section, description=instructions
            )
            return True

        self.recipe_ai_task.error_message = (
            f"{self.title} does not have ingredients/instructions attached from Scale."
        )
        self.recipe_ai_task.save()

        return False


class RecipeSection(BaseModel):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_section",
    )
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Section"
        verbose_name_plural = "Sections"

    def __unicode__(self):
        return "%s" % self.name

    def __str__(self):
        return f"{self.name}"


class Ingredient(BaseModel):
    UNIT_CUP = "cup"
    UNIT_GALLON = "gallon"
    UNIT_GRAM = "gram"
    UNIT_KILOGRAM = "kilogram"
    UNIT_LITER = "liter"
    UNIT_MILILITER = "mililiter"
    UNIT_OUNCE = "ounce"
    UNIT_PIECE = "piece"
    UNIT_PINCH = "pinch"
    UNIT_PINT = "pint"
    UNIT_POUND = "pound"
    UNIT_QUART = "quart"
    UNIT_SLICE = "slice"
    UNIT_TABLESPOON = "tablespoon"
    UNIT_TEASPOON = "teaspoon"
    UNIT_OTHER = "other unit"

    UNIT_CHOICES = [
        (UNIT_CUP, "Cup"),
        (UNIT_GALLON, "Gallon"),
        (UNIT_GRAM, "Gram"),
        (UNIT_KILOGRAM, "Kilogram"),
        (UNIT_LITER, "Liter"),
        (UNIT_MILILITER, "Mililiter"),
        (UNIT_OUNCE, "Ounce"),
        (UNIT_PIECE, "Piece"),
        (UNIT_PINCH, "Pinch"),
        (UNIT_PINT, "Pint"),
        (UNIT_POUND, "Pound"),
        (UNIT_QUART, "Quart"),
        (UNIT_SLICE, "Slice"),
        (UNIT_TABLESPOON, "Tablespoon"),
        (UNIT_TEASPOON, "Teaspoon"),
        (UNIT_OTHER, "Other Unit"),
    ]

    section = models.ForeignKey(
        RecipeSection,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="section_ingredient",
    )
    name = models.CharField(max_length=255)
    amount = models.CharField(_("Amount"), max_length=100, **OPTIONAL)
    unit = models.CharField(
        _("Unit"), choices=UNIT_CHOICES, max_length=100, **OPTIONAL)
    other_field = models.CharField(
        _("Other Field"), max_length=100, **OPTIONAL)

    class Meta:
        verbose_name = "Ingredient"
        verbose_name_plural = "Ingredients"

    def __unicode__(self):
        return "%s" % self.name

    def __str__(self):
        return f"{self.name}"


class RecipeInstruction(BaseModel):
    section = models.ForeignKey(
        RecipeSection,
        on_delete=models.CASCADE,
        related_name="section_instruction",
        blank=True,
        null=True,
    )
    image = models.ImageField(
        upload_to=generate_recipe_file_name, blank=True, null=True
    )
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Recipe Instruction"
        verbose_name_plural = "Recipe Instructions"

    def __unicode__(self):
        return "%s" % self.id

    def __str__(self):
        return f"{self.section.recipe.title}"


class RecipeLikes(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="user_recipe_likes",
        db_index=True,
    )
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_likes",
        db_index=True,
    )

    class Meta:
        verbose_name = "Recipe Likes"
        verbose_name_plural = "Recipe Likes"
        unique_together = [["recipe", "user"]]

    def __unicode__(self):
        return f"{self.user.username} likes {self.recipe.title}"

    def __str__(self):
        return f"{self.user.username} likes {self.recipe.title}"


class Images(BaseModel):
    image = models.ImageField(upload_to=generate_recipe_file_name)

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"

    def __unicode__(self):
        return f"{self.image.name}"

    def __str__(self):
        return f"{self.image.name}"


class RecipeImages(BaseModel):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_images",
    )
    images = models.ManyToManyField(Images, related_name="images_of_recipe")

    class Meta:
        verbose_name = "Recipe Image"
        verbose_name_plural = "Recipe Images"

    def __unicode__(self):
        return f"{self.recipe}"

    def __str__(self):
        return f"{self.recipe}"


class RecipeRatings(BaseModel):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_id",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="user_who_rated_recipe",
    )

    rate = models.IntegerField(default=0)


class RecipeAITask(TimeStampedModel):
    STATUS_CREATED = "created"
    STATUS_PENDING = "pending"
    STATUS_REJECTED = "rejected"
    STATUS_DONE = "done"

    STATUS_CHOICES = [
        (STATUS_CREATED, "Created"),
        (STATUS_PENDING, "Pending"),
        (STATUS_REJECTED, "Rejected"),
        (STATUS_DONE, "Done"),
    ]

    TYPE_IMAGE = "image"
    TYPE_WEBSITE = "website"
    TYPE_AUDIO = "audio"

    TYPE_CHOICES = [
        (TYPE_IMAGE, "Image"),
        (TYPE_WEBSITE, "Website"),
        (TYPE_AUDIO, "Audio"),
    ]

    recipe = models.OneToOneField(
        "recipe.Recipe",
        verbose_name=_("RecipeAITask"),
        related_name="recipe_ai_task",
        on_delete=models.CASCADE,
    )

    status = models.CharField(
        _("Status"),
        choices=STATUS_CHOICES,
        default=STATUS_CREATED,
        **OPTIONAL,
        max_length=100,
    )
    type = models.CharField(_("Type"), choices=TYPE_CHOICES, max_length=100)
    scale_task_id = models.CharField(
        _("Scale Task ID"), max_length=100, **OPTIONAL)
    extra_data = JSONField(_("Extra Data"), default=dict, **OPTIONAL)
    error_message = models.TextField(**OPTIONAL, max_length=255)
    error_response = models.TextField(**OPTIONAL, max_length=255)

    class Meta:
        verbose_name = _("Recipe AI Task")
        verbose_name_plural = _("Recipe AI Tasks")

    def __str__(self):
        return f"{self.recipe}"


class RecipeAIImage(TimeStampedModel):
    recipe_ai_task = models.ForeignKey(
        "recipe.RecipeAITask",
        related_name="ai_images",
        on_delete=models.CASCADE,
        verbose_name=_("Recipe AI Task"),
    )
    picture = models.ImageField(_("Picture"), upload_to=get_upload_path)
 
    class Meta:
        verbose_name = _("Recipe AI Image")
        verbose_name_plural = _("Recipe AI Images")

    def __str__(self):
        return f"{self.recipe_ai_task}"


class RecipeAIWebsiteURL(TimeStampedModel):
    recipe_ai_task = models.ForeignKey(
        "recipe.RecipeAITask",
        related_name="ai_websites",
        on_delete=models.CASCADE,
        verbose_name=_("Recipe AI Task"),
    )
    website_url = models.CharField(_("Website URL"), max_length=100)

    class Meta:
        verbose_name = _("Recipe AI Website URL")
        verbose_name_plural = _("Recipe AI Website URLs")

    def __str__(self):
        return f"{self.recipe_ai_task}"


class RecipeAIAudio(TimeStampedModel):
    recipe_ai_task = models.ForeignKey(
        "recipe.RecipeAITask",
        related_name="ai_audio_files",
        on_delete=models.CASCADE,
        verbose_name=_("Recipe AI Task"),
    )
    audio_file = models.FileField(_("Audio File"), upload_to=get_upload_path)

    class Meta:
        verbose_name = _("Recipe AI Audio File")
        verbose_name_plural = _("Recipe AI Audio Files")

    def __str__(self):
        return f"{self.recipe_ai_task}"
