from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, RedirectView, UpdateView
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny
from .serializers import (
    ChangeUsernameSerializer,
    UploadUserImageSerializer,
    TermsAndConditionsSerializer,
    CategoryMasterSerializer,
    UploadUserPhoneNumberSerializer,
    UserDemographicsSerializer,
    UserCategorySerializer,
    UserSerializer,
    GetUserCategorySerializer,
    GetUserFollowSerializer,
    AddMeasurementSerializer,
    UserDemographicFollowingSerializer,
    UserProfileDemographicsSerializer,
    UserProfileSerializer,
    UserFolowingSerializer,
    UserFollowingReadSerializer,
    EditMeasurementSerializer,
    PushNotificationSerializer
)
from .models import User, TermsAndConditions, CategoryMaster, UserFollowing
from django.http.response import JsonResponse
from rest_framework.response import Response
from .models import UserDemographics, UserCategory
import boto3
from botocore.client import Config
from botocore.exceptions import ClientError
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework import mixins

from django_filters.rest_framework import DjangoFilterBackend
from allauth.utils import generate_unique_username
import requests
import json

from utils.serializer_utils import ChefmateUpdateViewSet
from home.api.v1.serializers import UserSerializer as HomeUserSerializer


s3_signature = {"v4": "s3v4", "v2": "s3"}

User = get_user_model()


class NewUserUpdateViewSet(ChefmateUpdateViewSet):
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()


class NewUserFollowingViewSet(viewsets.ModelViewSet):
    serializer_class = UserFolowingSerializer
    queryset = UserFollowing.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user__id", "following_user__id"]

    def get_serializer_class(self):
        if self.action == "list":
            return UserFollowingReadSerializer
        return super().get_serializer_class()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()


class UploadUserImageView(generics.GenericAPIView):
    serializer_class = UploadUserImageSerializer

    def post(self, request):

        # Put the data from the request into the serializer

        serializer = self.serializer_class(data=request.data)
        # Validate the data
        serializer.is_valid(raise_exception=True)
        return JsonResponse(
            {"message": "user demographics added successfully"},
            status=status.HTTP_201_CREATED,
        )


class AddMeasurementView(generics.GenericAPIView):
    serializer_class = AddMeasurementSerializer

    def put(self, request):

        # Put the data from the request into the serializer

        serializer = self.serializer_class(data=request.data)
        # Validate the data
        serializer.is_valid(raise_exception=True)
        return JsonResponse(
            {"message": "Measurement updated successfully"}, status=status.HTTP_200_OK
        )


class UploadUserPhoneNumberView(generics.GenericAPIView):
    serializer_class = UploadUserPhoneNumberSerializer

    def post(self, request):

        # Put the data from the request into the serializer

        serializer = self.serializer_class(data=request.data)
        # Validate the data
        serializer.is_valid(raise_exception=True)
        email = request.data["email"]
        user = User.objects.get(email=email)
        user_demo = UserDemographics.objects.get(user_id=user.id)
        user_serializer = UserDemographicsSerializer(user_demo)
        return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)

    def get(self, request):
        user_id = request.data["user_id"]
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "user doesnt exist"}, status=status.HTTP_200_OK
            )
        try:
            UserDemographics.objects.get(user_id=user_id)
        except UserDemographics.DoesNotExist:
            return JsonResponse(
                {"message": "phone number not exist for this user"},
                status=status.HTTP_200_OK,
            )
        user_demographics = UserDemographics.objects.get(user_id=user_id)
        serializer = UserDemographicsSerializer(user_demographics)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)


class EditMeasurementView(generics.GenericAPIView):
    serializer_class = EditMeasurementSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data["email"]
        user = User.objects.get(email=email)
        user_demo = UserDemographics.objects.get(user_id=user.id)
        user_serializer = UserDemographicsSerializer(user_demo)
        return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)


class PushNotificationView(generics.GenericAPIView):
    serializer_class = PushNotificationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data["email"]
        user = User.objects.get(email=email)
        user_demo = UserDemographics.objects.get(user_id=user.id)
        user_serializer = UserDemographicsSerializer(user_demo)
        return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)


class CategoryMasterView(generics.GenericAPIView):
    queryset = CategoryMaster.objects.all()
    serializer_class = CategoryMasterSerializer

    def post(self, request):

        # Put the data from the request into the serializer
        serializer = self.serializer_class(data=request.data)
        # Validate the data
        serializer.is_valid(raise_exception=True)
        return JsonResponse(
            {"message": "categories added successfully"}, status=status.HTTP_200_OK
        )

    def get(self, request):
        q = self.get_queryset().values("id", "name", "image")
        return JsonResponse(list(q), status=status.HTTP_200_OK, safe=False)


class ChangeUsernameView(mixins.UpdateModelMixin, generics.GenericAPIView):
    serializer_class = ChangeUsernameSerializer
    queryset = User.objects.all()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class TermsAndConditionsView(generics.GenericAPIView):
    queryset = TermsAndConditions.objects.all()
    serializer_class = TermsAndConditionsSerializer

    def get(self, request):
        q = self.get_queryset().values("header", "data")
        return JsonResponse(list(q), status=status.HTTP_200_OK, safe=False)


class UserProfileView(generics.GenericAPIView):
    def get(self, request):
        user_id = request.user.id
        try:
            user = User.objects.get(id=user_id)
            user_serializer = UserSerializer(user)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "User does not exist"}, status=status.HTTP_200_OK
            )
        try:
            user_demographics = UserDemographics.objects.get(user_id=user_id)
        except UserDemographics.DoesNotExist:
            return Response({"user": user_serializer.data})

        user_demographics_serializer = UserProfileDemographicsSerializer(
            user_demographics
        )
        try:
            user_category = UserCategory.objects.filter(user_id=user_id)
        except UserCategory.DoesNotExist:
            return Response(
                {
                    "user": user_serializer.data,
                    "user_data": user_demographics_serializer.data,
                }
            )

        user_category_serializer = GetUserCategorySerializer(
            user_category, many=True)
        return JsonResponse(
            {
                "user": user_serializer.data,
                "user_data": user_demographics_serializer.data,
                "user_category": user_category_serializer.data,
            },
            status=status.HTTP_200_OK,
            safe=False,
        )


class AllUsersProfileView(generics.GenericAPIView):
    def get(self, request):
        all_users = User.objects.all()
        result = []
        for user in all_users:
            user_data = UserProfileSerializer(user).data
            result.append(user_data)
        return Response({"users": result}, status=status.HTTP_200_OK)


class UserCategoryView(generics.GenericAPIView):
    serializer_class = UserCategorySerializer

    def post(self, request):

        try:
            # Put the data from the request into the serializer
            serializer = self.serializer_class(data=request.data)
            # Validate the data
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return JsonResponse({"error": "Error while adding user category"})
        return JsonResponse(
            {"message": " user category added successfully"}, status=status.HTTP_200_OK
        )

    def get(self, request):
        user_id = request.data["user_id"]
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "user doesnt exist"}, status=status.HTTP_200_OK
            )
        user_category = UserCategory.objects.filter(user_id=user_id)
        if user_category is None:
            return JsonResponse(
                {"message": "No category added for this user"},
                status=status.HTTP_200_OK,
            )
        else:
            serializer = GetUserCategorySerializer(user_category, many=True)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


class FollowView(generics.GenericAPIView):
    def post(self, request):
        user_id = request.data["user_id"]
        following_user_id = request.data["following_user_id"]
        if user_id == following_user_id:
            return JsonResponse(
                {"message": "User can not follow itself"}, status=status.HTTP_200_OK
            )
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "User doesnt exist"}, status=status.HTTP_200_OK
            )
        try:
            follow = User.objects.get(id=following_user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "follow User doesnt exist"}, status=status.HTTP_200_OK
            )
        try:
            UserFollowing.objects.create(
                user_id=user_id, following_user_id=following_user_id
            )
        except Exception as e:
            print(e)
        except Exception as e:
            return JsonResponse({"error": "Error while adding user category"})
        return JsonResponse(
            {"message": "User followed successfully"}, status=status.HTTP_200_OK
        )


class UnfollowView(generics.GenericAPIView):
    def delete(self, request):
        user_id = request.data["user_id"]
        following_user_id = request.data["following_user_id"]
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "User doesnt exist"}, status=status.HTTP_200_OK
            )
        try:
            follow = User.objects.get(id=following_user_id)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "follow User doesnt exist"}, status=status.HTTP_200_OK
            )
        try:
            user = UserFollowing.objects.get(
                user_id=user_id, following_user_id=following_user_id
            )
        except UserFollowing.DoesNotExist:
            return JsonResponse({"message": "Success"}, status=status.HTTP_200_OK)
        user.delete()
        return JsonResponse(
            {"message": "User Unfollow successfully"}, status=status.HTTP_200_OK
        )


class GetUserFollowerFollowingView(generics.GenericAPIView):
    def get(self, request):
        userid = request.data["user_id"]
        try:
            user = User.objects.get(id=userid)
        except User.DoesNotExist:
            return JsonResponse(
                {"message": "User does not exist"}, status=status.HTTP_200_OK
            )
        following_data = GetUserFollowSerializer(user)
        return JsonResponse(
            {
                "status": status.HTTP_200_OK,
                "data": following_data.data,
                "message": "success",
            }
        )


class GetFriendsView(generics.GenericAPIView):
    def get(self, request):
        phone_list = request.data["phone_number"]
        user_id = request.data["user_id"]

        from django.db import connection

        with connection.cursor() as cursor:
            cursor.execute(
                "with user_demographic_data as(select ud.user_id AS pk_id, u.first_name AS first_name, u.last_name "
                "AS last_name, ud.mobile AS mobile, ud.image AS image from users_user u join users_userdemographics ud "
                "ON u.id = ud.user_id where ud.mobile IN %s), user_following_data as "
                "( select user_id as pk_id from users_userfollowing uf WHERE uf.user_id in ( select ud.user_id AS user_id "
                "from users_user u join users_userdemographics ud ON u.id = ud.user_id where ud.mobile "
                "IN %s ) and uf.following_user_id = %s ) select user_demographic_data.pk_id as "
                "user_id, user_demographic_data.first_name, user_demographic_data.last_name, user_demographic_data.mobile, "
                "user_demographic_data.image, case when user_following_data.pk_id is not null then true else false end as "
                "following from user_demographic_data left join user_following_data on user_demographic_data.pk_id = "
                "user_following_data.pk_id",
                [phone_list, phone_list, user_id],
            )
            columns = [column[0] for column in cursor.description]
            result_list = []
            for row in cursor.fetchall():
                result_list.append(dict(zip(columns, row)))

        print(result_list)
        serializer = UserDemographicFollowingSerializer(result_list, many=True)
        return JsonResponse(serializer.data, safe=False)


class UserMultiCategoryView(generics.GenericAPIView):
    def post(self, request):
        try:
            user_id = request.data["user_id"]
            category_id_list = request.data["category_id_list"]
            for category_id in category_id_list:
                try:
                    UserCategory.objects.create(
                        user_id=user_id, category_id=category_id
                    )
                except Exception as e:
                    print(e)
        except Exception as e:
            return JsonResponse({"error": "Error while adding user category"})

        return JsonResponse(
            {"message": " user category added successfully"}, status=status.HTTP_200_OK
        )


class FollowAllView(generics.GenericAPIView):
    def post(self, request):
        try:
            user_id = request.data["user_id"]
            follow_user_id_list = request.data["follow_user_id_list"]
            for follow_user_id in follow_user_id_list:
                print("I am here")
                try:
                    UserFollowing.objects.create(
                        user_id=follow_user_id, following_user_id=user_id
                    )
                except Exception as e:
                    print(e)
        except Exception as e:
            return JsonResponse({"error": "Error while adding user follow data"})

        return JsonResponse(
            {"message": "User follow data added successfully"},
            status=status.HTTP_200_OK,
        )


class DownloadS3FileView(generics.GenericAPIView):
    def post(self, request):
        file_path = request.data["file_path"]
        signature_version = s3_signature["v4"]
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            config=Config(signature_version=signature_version),
            region_name=settings.AWS_S3_REGION_NAME,
        )
        try:
            response_url = s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                        "Key": file_path},
                ExpiresIn=3600,
            )
        except ClientError as e:
            JsonResponse(
                {
                    "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "error": "Error while getting file",
                }
            )

        return JsonResponse({"status": status.HTTP_200_OK, "file_url": response_url})


class FacebookLogin(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        print("I am here at 1")
        input_data = json.loads(request.body.decode("utf-8"))
        print(input_data)
        if "token" not in input_data or not input_data["token"]:
            return Response(
                {"message": "Error! token is required",
                    "status": False, "data": {}},
                status=400,
            )
        print("I am here at 2")
        r = requests.get(
            f'https://graph.facebook.com/me?fields=email,name,id,first_name,last_name&access_token={input_data["token"]}'
        )
        print(r.text)
        data = json.loads(r.text)
        if "error" in data:
            return Response(
                {
                    "message": "wrong facebook token / this facebook token is already expired.",
                    "status": False,
                    "data": {},
                },
                status=400,
            )
        print("I am here at 3")
        try:
            r = requests.get(
                f'https://graph.facebook.com/v9.0/{data["id"]}?access_token={input_data["token"]}'
            )
            frnds_data = json.loads(r.text)
            print(
                "-----------------------------------------FRIENDS LIST-------------------------------------------",
                frnds_data,
            )
        except:
            pass
        if "email" not in data:
            return Response(
                {
                    "message": "Error! email is not public in this token, please try another account.",
                    "status": False,
                    "data": {},
                },
                status=400,
            )

            # create user if not exist
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            user = User()
            name = data["first_name"] + " " + data["last_name"]
            username = generate_unique_username([name, data["email"], "user"])

            user.username = username
            # provider random default password
            user.password = make_password(
                BaseUserManager().make_random_password())
            user.email = data["email"]
            user.login_type = "FACEBOOK"
            user.social_id = data["id"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            user.name = name
            user.save()

        token, created = Token.objects.get_or_create(
            user=user
        )  # generate token without username & password
        user_serializer = UserSerializer(user)
        response = {}
        response["data"] = {"token": token.key, "user": user_serializer.data}
        # response['refresh_token'] = str(token)
        response["status"] = True
        response["message"] = "Success! user login."
        return Response(response, status=200)


class GoogleLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        input_data = json.loads(request.body.decode("utf-8"))
        if "token" not in input_data or not input_data["token"]:
            return Response(
                {"message": "Error! token is required",
                    "status": False, "data": {}},
                status=400,
            )
        payload = {"access_token": request.data.get(
            "token")}  # validate the token
        r = requests.get(
            "https://www.googleapis.com/oauth2/v2/userinfo", params=payload
        )

        data = json.loads(r.text)

        if "error" in data:
            return Response(
                {
                    "message": "wrong google token / this google token is already expired.",
                    "status": False,
                    "data": {},
                },
                status=400,
            )

        # create user if not exist
        try:
            user = User.objects.get(email=data["email"])

        except User.DoesNotExist:
            user = User()
            user.username = data["email"]
            sep = '@'
            strippedName = data["email"].split(sep, 1)[0]
            # provider random default password
            user.password = make_password(
                BaseUserManager().make_random_password())
            user.email = data["email"]
            user.name = strippedName
            user.login_type = "GOOGLE"
            user.social_id = data["id"]
            user.save()

        token, created = Token.objects.get_or_create(
            user=user
        )  # generate token without username & password
        user_serializer = HomeUserSerializer(user)
        try:
            user_demographics = UserDemographics.objects.get(user_id=user.id)
        except UserDemographics.DoesNotExist:
            response = {}
            response["data"] = {
                "token": token.key,
                "user": user_serializer.data,
                "user_id": user.id,
            }
            # response['refresh_token'] = str(token)
            response["status"] = True
            response["message"] = "Success! user login."
            return Response(response)
        user_demographics_serializer = UserDemographicsSerializer(
            user_demographics)
        response = {}
        response["data"] = {
            "token": token.key,
            "user": user_serializer.data,
            "user_id": user.id,
            "user_data": user_demographics_serializer.data,
        }
        # response['refresh_token'] = str(token)
        response["status"] = True
        response["message"] = "Success! user login."
        return Response(response)


class AppleLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data

        apple_id = data["apple_id"]

        if data["email"] is not None:
            try:
                user = User.objects.get(email=data["email"])
                print("user email found")
                user.apple_id = apple_id
                user.save()

            except User.DoesNotExist:
                user = User()
                name = data["givenName"] + " " + data["familyName"]
                user.username = data["email"]
                # provider random default password
                user.password = make_password(
                    BaseUserManager().make_random_password())
                user.email = data["email"]
                user.login_type = "APPLE"
                user.apple_id = apple_id
                user.first_name = data["givenName"]
                user.last_name = data["familyName"]
                user.name = name
                user.save()
            token, created = Token.objects.get_or_create(
                user=user
            )  # generate token without username & password
            user_serializer = HomeUserSerializer(user)
            response = {}
            response["data"] = {
                "token": token.key,
                "user": user_serializer.data,
                "user_id": user.id,
            }
            # response['refresh_token'] = str(token)
            response["status"] = True
            response["message"] = "Success! user login."
            return Response(response)

        if apple_id is not None and data["email"] is None:

            try:
                user = User.objects.get(apple_id=apple_id)
                print("user email found")
            except User.DoesNotExist:
                return Response({'Error': "User not found"}, status=status.HTTP_404_NOT_FOUND)

            token, created = Token.objects.get_or_create(
                user=user
            )  # generate token without username & password
            user_serializer = HomeUserSerializer(user)
            response = {}
            response["data"] = {
                "token": token.key,
                "user": user_serializer.data,
                "user_id": user.id,
            }
            # response['refresh_token'] = str(token)
            response["status"] = True
            response["message"] = "Success! user login."
            return Response(response)
        else:
            return Response({'Error': "User not found"}, status=status.HTTP_404_NOT_FOUND)
