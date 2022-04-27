import random

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from drf_extra_fields.fields import Base64ImageField
from .models import (
    UserDemographics,
    TermsAndConditions,
    CategoryMaster,
    UserCategory,
    UserFollowing,
)

from django.db import transaction
from django.http.response import JsonResponse
from django.contrib.auth import get_user_model
from drf_extra_fields.fields import Base64ImageField


User = get_user_model()


class FlattenMixin(object):
    """Flatens the specified related objects in this representation"""

    def to_representation(self, obj):
        assert hasattr(
            self.Meta, "flatten"
        ), 'Class {serializer_class} missing "Meta.flatten" attribute'.format(
            serializer_class=self.__class__.__name__
        )
        # Get the current object representation
        rep = super(FlattenMixin, self).to_representation(obj)
        # Iterate the specified related objects with their serializer
        for field, serializer_class in self.Meta.flatten:
            serializer = serializer_class(context=self.context)
            objrep = serializer.to_representation(getattr(obj, field))
            # Include their fields, prefixed, in the current   representation
            for key in objrep:
                # rep[field + "_" + key] = objrep[key]
                rep[key] = objrep[key]
        return rep


class UploadUserImageSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    image = Base64ImageField(required=False)

    class Meta:
        fields = ["email", "image"]

    def validate(self, attrs):
        email = attrs.get("email")
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")

        user_id = user.id
        try:
            user_demographics = UserDemographics.objects.get(user_id=user_id)
            user_demographics.image = attrs.get("image")
            user_demographics.save()
        except UserDemographics.DoesNotExist:
            # create user demographics
            image = attrs.get("image")
            user_demo = UserDemographics.objects.create(
                user_id=user_id, image=image)
            user_demo.save()

        return JsonResponse({"message": "User Demographics saved successfully"})


class UploadUserPhoneNumberSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    phone_number = serializers.CharField(max_length=13, required=False)

    class Meta:
        fields = ["email", "phone_number"]

    def validate(self, attrs):
        email = attrs.get("email")
        phone_number = attrs.get("phone_number")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            print("USER IS NOT FOUND")
            raise AuthenticationFailed("User not found")

        user_id = user.id
        try:
            user_demographics = UserDemographics.objects.get(user_id=user_id)
            try:
                user_demographics_with_phone = UserDemographics.objects.get(
                    mobile=phone_number
                )
                if user_demographics_with_phone.user_id != user_id:
                    raise AuthenticationFailed(
                        "A user with this phone number already exist"
                    )
            except UserDemographics.DoesNotExist:
                user_demographics.mobile = phone_number
                user_demographics.save()
        except UserDemographics.DoesNotExist:
            try:
                user_demographics_with_phone = UserDemographics.objects.get(
                    mobile=phone_number
                )
                if user_demographics_with_phone.user_id != user_id:
                    raise AuthenticationFailed(
                        "A user with this phone number already exist"
                    )
            except UserDemographics.DoesNotExist:
                user_demo = UserDemographics.objects.create(
                    user_id=user_id, mobile=phone_number
                )
                user_demo.save()
        return JsonResponse({"message": "Phone number saved successfully"})


class EditMeasurementSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    measurement_system = serializers.CharField(max_length=13, required=False)

    def validate(self, attrs):
        email = attrs.get("email")
        measurement_system = attrs.get("measurement_system")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")
        user_id = user.id
        try:
            user_demographics = UserDemographics.objects.get(user_id=user_id)
            user_demographics.measurement_system = measurement_system
            user_demographics.save()
        except UserDemographics.DoesNotExist:
            print("")
        return JsonResponse({"message": "Measurement system saved successfully"})


class PushNotificationSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    push_notifications = serializers.BooleanField(required=False)

    def validate(self, attrs):
        email = attrs.get("email")
        push_notifications = attrs.get("push_notifications")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")
        user_id = user.id
        try:
            user_demographics = UserDemographics.objects.get(user_id=user_id)
            user_demographics.push_notifications = push_notifications
            user_demographics.save()
        except UserDemographics.DoesNotExist:
            print("")
        return JsonResponse({"message": "Push notifications saved successfully"})


class UserProfileDemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDemographics
        fields = ("mobile", "image", "measurement_system")


class UserDemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDemographics
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    users_demo = UserProfileDemographicsSerializer(required=False)

    class Meta:
        model = User
        fields = ["id", "email", "name", "username", "users_demo"]


class UserFollowFollowingSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "name", "username"]
        flatten = [("users_demo", UserProfileDemographicsSerializer)]


class ChangeUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditions
        fields = "__all__"


class AddMeasurementSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    measurement_system = serializers.CharField(required=True)

    class Meta:
        fields = ["measurement_system", "email"]

    def validate(self, attrs):
        email = attrs.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")

        user_id = user.id
        try:
            user_demographics = UserDemographics.objects.get(user_id=user_id)
            user_demographics.measurement_system = attrs.get(
                "measurement_system")
            user_demographics.save()
        except UserDemographics.DoesNotExist:
            return JsonResponse(
                {"message": "User Demographics does not exist for this user"}
            )
        return JsonResponse({"message": "Measurements updated successfully"})


class GetUserDemographicsSerializer(FlattenMixin, serializers.ModelSerializer):
    # following = serializers.BooleanField(required=False)
    # logged_in_user_id = serializers.IntegerField(required=True)
    class Meta:
        model = UserDemographics
        fields = ("id", "mobile", "image", "user_id")
        flatten = [("user", UserSerializer)]

    """def get_user_demographic_data(self, attrs):
        user_id = attrs.get('user_id')
        logged_in_user_id = attrs.get('logged_in_user_id')
        try:
            UserFollowing.objects.get(id=user_id, following_user_id=logged_in_user_id)
            following = True
        except UserFollowing.DoesNotExist:
            following = False"""


class CategoryMasterSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    image = serializers.ImageField(max_length=500, required=False)

    class Meta:
        fields = ["name", "image"]

    def validate(self, attrs):
        try:
            name = attrs.get("name")
            category_master = CategoryMaster.objects.get(name=name)
            category_master.image = attrs.get("image")
            category_master.save()
        except CategoryMaster.DoesNotExist:
            image = attrs.get("image")
            name = attrs.get("name")
            category_master = CategoryMaster.objects.create(
                name=name, image=image)
            category_master.save()

        return JsonResponse({"message": "Categories added successfully"})


class UserCategorySerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)
    category_id = serializers.IntegerField(required=True)

    class Meta:
        fields = ["user_id", "category_id"]

    def validate(self, attrs):
        user_id = attrs.get("user_id")
        category_id = attrs.get("category_id")
        user_category = UserCategory.objects.create(
            user_id=user_id, category_id=category_id
        )
        user_category.save()

        return JsonResponse({"message": " User Categories added successfully"})


class GetUserCategorySerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=False)
    category_id = serializers.IntegerField(required=False)
    categoryName = serializers.CharField(source="category", read_only=True)

    class Meta:
        fields = ["user_id", "category_id"]


class GetUserWithDemographicsSerializer(serializers.Serializer):
    user = UserSerializer(required=True)

    class Meta:
        model = UserDemographics
        fields = ["mobile", "image"]


class FollowingSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id", "following_user", "created")
        flatten = [("following_user", UserFollowFollowingSerializer)]


class FollowersSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id", "user", "created")
        flatten = [("user", UserFollowFollowingSerializer)]


# class UserFolowingSerializer(serializers.ModelSerializer):
#     user_id = serializers.IntegerField(required=False)
#     following_user_id = serializers.IntegerField(required=False)

#     class Meta:
#         model = UserFollowing
#         fields = ("id", "user_id", "following_user_id")


class GetUserFollowSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    users_demo = UserProfileDemographicsSerializer(required=True)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
            "username",
            "users_demo",
            "following",
            "followers",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data


class UserDemographicFollowingSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    mobile = serializers.CharField(required=False)
    image = serializers.CharField(required=False)
    following = serializers.BooleanField(required=False)

    class Meta:
        fields = ["user_id", "first_name", "last_name",
                  "mobile", "image", "following"]


class UserFollowingReadSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    following_user = UserSerializer(read_only=True)

    class Meta:
        model = UserFollowing
        fields = "__all__"


class UserFolowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    users_demo = UserDemographicsSerializer()
    following = UserFolowingSerializer(many=True)
    badge = serializers.SerializerMethodField()

    def get_badge(self, obj):
        temp_list = ["Super Chef", "Streak"]
        return random.choice(temp_list)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "username",
            "users_demo",
            "following",
            "is_trusted",
            "badge",
        ]

    @transaction.atomic
    def update(self, instance, validated_data):
        users_demo = validated_data.get("users_demo")
        if users_demo:
            validated_data.pop("users_demo")

        user = super().update(instance, validated_data)

        # Update users_demo
        if users_demo:
            mobile = users_demo.get("mobile")
            if mobile:
                user.users_demo.mobile = mobile
            measurement_system = users_demo.get("measurement_system")
            if measurement_system:
                user.users_demo.measurement_system = measurement_system
            push_notifications = users_demo.get("push_notifications")
            if push_notifications:
                user.users_demo.push_notifications = push_notifications
            measuring_systems = users_demo.get("measuring_systems")
            if measuring_systems:
                user.users_demo.measuring_systems = measuring_systems

            user.users_demo.save()
            user.refresh_from_db()

        return user
