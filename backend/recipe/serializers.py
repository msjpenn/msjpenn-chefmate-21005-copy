import random

from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from django.db.models import Avg

from .models import (
    Ingredient,
    RecipeAIWebsiteURL,
    RecipeSection,
    Recipe,
    RecipeLikes,
    RecipeImages,
    Images,
    RecipeInstruction,
    RecipeRatings,
    RecipeAIImage,
    RecipeAITask,
)
from users.serializers import UserProfileSerializer
from comment.serializers import CommentSerializer
from bookmarks.models import Bookmark
from recipe_category.serializers import RecipeCategorySerializer


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = "__all__"


class RecipeImagesSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, required=False)

    def create(self, validated_data):
        data = validated_data.copy()

        images_data = self.context.get("request").FILES.getlist("images")

        try:
            recipe_images = RecipeImages.objects.create(**data)
        except TypeError:
            msg = "Got a `TypeError` when calling `PhotoBook.objects.create()`."
            raise TypeError(msg)
        try:
            for image_data in images_data:
                image, created = Images.objects.get_or_create(image=image_data)
                recipe_images.images.add(image)

            return recipe_images
        except TypeError:
            recipe_image = recipe_images.objects.get(pk=recipe_images.id)
            recipe_image.delete()
            msg = "Got a `TypeError` when calling `Image.objects.get_or_create()`."
            raise TypeError(msg)

        return photobook

    class Meta:
        model = RecipeImages
        fields = "__all__"


class RecipeLikesSerializer(ModelSerializer):
    class Meta:
        model = RecipeLikes
        fields = "__all__"


class RecipeRatingSerializer(ModelSerializer):
    class Meta:
        model = RecipeRatings
        fields = "__all__"


class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class RecipeInstructionSerializer(ModelSerializer):
    image = Base64ImageField(required=False)

    class Meta:
        model = RecipeInstruction
        fields = "__all__"

    # def create(self, validated_data):
    #     raise


class RecipeCreateInstructionSerializer(ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop("many", True)
        super(RecipeCreateInstructionSerializer, self).__init__(
            many=many, *args, **kwargs
        )

    class Meta:
        model = RecipeInstruction
        fields = "__all__"


class RecipeSectionSerializer(ModelSerializer):
    ingredients = IngredientSerializer(
        many=True, source="section_ingredient", required=False
    )
    instructions = RecipeInstructionSerializer(
        many=True, source="section_instruction", required=False
    )

    class Meta:
        model = RecipeSection
        fields = (
            "ingredients",
            "uuid",
            "id",
            "name",
            "recipe",
            "instructions",
        )

    # def create(self, validated_data):
    #     raise
    #     order = Order.objects.get(pk=validated_data.pop("event"))
    #     instance = Equipment.objects.create(**validated_data)
    #     Assignment.objects.create(Order=order, Equipment=instance)
    #     return instance


class RecipeSerializer(ModelSerializer):
    sections = RecipeSectionSerializer(
        many=True, source="recipe_section", required=False
    )
    user = UserProfileSerializer()
    comments = CommentSerializer(many=True, source="recipe_comment", read_only=True)
    rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    total_recreated = serializers.SerializerMethodField()
    recreated = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    user_likes_this = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    images = RecipeImagesSerializer(many=True, source="recipe_images", read_only=True)
    category = RecipeCategorySerializer(
        many=True, source="recipe_category", read_only=True
    )

    def get_is_bookmarked(self, obj):
        request = self.context["request"]
        if request.user.is_anonymous:
            return False
        return Bookmark.objects.filter(user=request.user, recipe=obj).exists()

    def get_likes(self, obj):
        return RecipeLikes.objects.filter(recipe=obj).count()

    def get_user_likes_this(self, obj):
        request = self.context["request"]
        print(request.user)
        if request.user.is_anonymous:
            return False
        return RecipeLikes.objects.filter(user=request.user, recipe=obj).exists()

    def get_total_recreated(self, obj):
        # print(Recipe.objects.filter(recreated_from=obj))
        return Recipe.objects.filter(recreated_from=obj).count()

    def get_recreated(self, obj):
        recipess = Recipe.objects.filter(recreated_from=obj)

    
        return "none"

    # def get_recreated(self, obj):
    #     return Recipe.objects.filter(recreated_from=obj)

    def get_rating(self, obj):

        return RecipeRatings.objects.filter(recipe=obj).aggregate(Avg("rate"))

    def get_rating_count(self, obj):

        return RecipeRatings.objects.filter(recipe=obj).count()

    class Meta:
        model = Recipe
        fields = (
            "sections",
            "rating",
            "uuid",
            "title",
            "url",
            "description",
            "id",
            "picture",
            "user",
            "comments",
            "total_hours_to_make",
            "total_recreated",
            "recreated",
            "likes",
            "user_likes_this",
            "is_bookmarked",
            "recreated_from",
            "is_draft",
            "images",
            "created_at",
            "category",
            "serving_size",
            "rating_count",
        )


class RecipeWriteSerializer(ModelSerializer):
    picture = Base64ImageField(required=False)

    class Meta:
        model = Recipe
        fields = "__all__"


class RecipeAIImageSerializer(ModelSerializer):
    attachments = serializers.ListField(write_only=True)

    class Meta:
        model = Recipe
        fields = ["id", "user", "title", "serving_size", "attachments"]

    def create(self, validated_data):
        attachments = validated_data.pop("attachments")
        validated_data["user"] = self.context.get("request").user
        recipe = super().create(validated_data)
        recipe_ai_task = RecipeAITask.objects.create(
            recipe=recipe, type=RecipeAITask.TYPE_IMAGE
        )
        recipe_ai_image_list = []
        for attachment in attachments:
            recipe_ai_image_list.append(
                RecipeAIImage(recipe_ai_task=recipe_ai_task, picture=attachment)
            )

        RecipeAIImage.objects.bulk_create(recipe_ai_image_list)
        return recipe


class RecipeAIWebsiteSerializer(ModelSerializer):
    website_url = serializers.CharField(write_only=True)

    class Meta:
        model = Recipe
        fields = ["id", "user", "title", "serving_size", "website_url"]

    def create(self, validated_data):
        website_url = validated_data.pop("website_url")
        validated_data["user"] = self.context.get("request").user
        recipe = super().create(validated_data)
        recipe_ai_task = RecipeAITask.objects.create(
            recipe=recipe, type=RecipeAITask.TYPE_WEBSITE
        )

        RecipeAIWebsiteURL.objects.create(
            recipe_ai_task=recipe_ai_task, website_url=website_url
        )

        return recipe
