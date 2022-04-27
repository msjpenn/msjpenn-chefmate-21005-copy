from rest_framework import serializers

from .models import BookmarkGroup, Bookmark
from recipe.serializers import RecipeSerializer


class BookmarkGroupSerializer(serializers.ModelSerializer):
    total_recipes = serializers.SerializerMethodField()

    class Meta:
        model = BookmarkGroup
        fields = "__all__"

    def get_total_recipes(self, obj):
        return Bookmark.objects.filter(group=obj).count()


class BookmarkBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = "__all__"


class BookmarkSerializer(BookmarkBaseSerializer):
    recipe = RecipeSerializer()
    group = BookmarkGroupSerializer()

    class Meta:
        model = Bookmark
        fields = "__all__"
