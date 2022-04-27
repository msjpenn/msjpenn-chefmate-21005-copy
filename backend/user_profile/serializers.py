from django.contrib.auth import get_user_model

from rest_framework import serializers

from users.models import UserFollowing, UserDemographics
from recipe.models import Recipe


User = get_user_model()


class UserProfileReadSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    recipe_count = serializers.SerializerMethodField()
    user_image = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()

    def get_user_image(self, obj):
        user_demographics = UserDemographics.objects.filter(user=obj)
        if len(user_demographics) == 1:
            user = user_demographics[0]
            try:
                return user.image.url
            except ValueError as e:
                print(e)

        return None

    def get_phone(self, obj):
        user_demographics = UserDemographics.objects.filter(user=obj)
        if len(user_demographics) == 1:
            user = user_demographics[0]
            try:
                return user.mobile
            except ValueError as e:
                print(e)

        return None

    def get_recipe_count(self, obj):
        return Recipe.objects.filter(user=obj).count()

    def get_following(self, obj):
        return UserFollowing.objects.filter(user=obj).count()

    def get_is_following(self, obj):
        request = self.context["request"]
        return UserFollowing.objects.filter(
            user=request.user, following_user=obj
        ).exists()

    def get_followers(self, obj):
        return UserFollowing.objects.filter(following_user=obj).count()

    def get_following_id(self, obj):
        if UserFollowing.objects.filter(following_user=obj).exists():
            return UserFollowing.objects.filter(following_user=obj).first().id
        return 0

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
            "username",
            "is_following",
            "followers",
            "following",
            "recipe_count",
            "user_image",
            "following_id",
            "phone"
        )


class SelfUserProfilerReadSerializer(UserProfileReadSerializer):
    user_measurement_system = serializers.SerializerMethodField()
    push_notification = serializers.SerializerMethodField()
    user_image = serializers.SerializerMethodField()

    def get_user_image(self, obj):
        user_demographics = UserDemographics.objects.filter(user=obj)
        if len(user_demographics) == 1:
            user = user_demographics[0]
            try:
                return user.image.url
            except ValueError as e:
                print(e)

        return None

    def get_user_measurement_system(self, obj):
        user_demographics = UserDemographics.objects.filter(user=obj)
        if len(user_demographics) == 1:
            user = user_demographics[0]
            return user.measurement_system
        return None

    def get_push_notification(self, obj):
        user_demographics = UserDemographics.objects.filter(user=obj)
        if len(user_demographics) == 1:
            user = user_demographics[0]
            return user.push_notifications
        return None

    class Meta(UserProfileReadSerializer.Meta):
        model = User
        fields = UserProfileReadSerializer.Meta.fields + (
            "user_measurement_system",
            "push_notification",
            "user_image",
        )
