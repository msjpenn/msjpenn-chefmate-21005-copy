from rest_framework import serializers
from recipe.serializers import RecipeSerializer
from users.serializers import UserProfileSerializer

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer()
    user = UserProfileSerializer()
    recipient = UserProfileSerializer()

    class Meta:
        model = Notification
        fields = "__all__"


class NotificationWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = "__all__"
