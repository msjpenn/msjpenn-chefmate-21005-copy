from django.db import models

from recipe.models import Recipe
from utils.models import BaseModel
from core.utils import generate_recipe_file_name


class RecipeCategory(models.Model):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_category",
    )
    name = models.TextField(blank=True, null=True, max_length=255)
    image = models.ImageField(
        upload_to=generate_recipe_file_name, blank=True, null=True
    )

    class Meta:
        verbose_name = "Recipe Category"
        verbose_name_plural = "Recipe Categories"

    def __unicode__(self):
        return f"{self.recipe}"

    def __str__(self):
        return f"{self.recipe}"