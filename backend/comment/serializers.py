from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Comment
from users.serializers import UserProfileSerializer


class CommentBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

    # def validate(self, request):
    #     user = request.get("user")
    #     print(user)
    #     return request


class CommentSerializer(CommentBaseSerializer):
    user = UserProfileSerializer()

    class Meta:
        model = Comment
        fields = "__all__"

    def validate(self, request):
        # email = request.data["email"]
        print('email')
