from django.contrib.auth import get_user_model

from rest_framework import serializers

from recipe.serializers import RecipeSerializer
from users.serializers import UserProfileSerializer


class FeedSerializer(RecipeSerializer):
    pass


class SearchFeedSerializer(serializers.Serializer):
    recipes = FeedSerializer(many=True)
    users = UserProfileSerializer(many=True)