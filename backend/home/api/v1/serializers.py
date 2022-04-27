import os
from .utils import send_verification_email
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from django.template.loader import get_template
from django.core.mail import send_mail, EmailMultiAlternatives, EmailMessage
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.template.loader import render_to_string

from rest_auth.serializers import PasswordResetSerializer
from rest_auth.models import TokenModel

from home.models import CustomText, HomePage
from users.models import UserDemographics

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {
                "required": True,
                "allow_blank": False,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_password(self, pwd):
        if len(pwd) < 5:
            raise serializers.ValidationError(
                _("Password should be minimum of 5 characters")
            )
        return pwd

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get(
                    "email"), "user"]
            ),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        try:
            sent_to_email = validated_data.get("email")
            from_mail = settings.DEFAULT_FROM_EMAIL
            html_tpl_path = "welcome.html"
            text_content = {}
            email_html_template = get_template(
                html_tpl_path).render(text_content)
            send_mail(
                "Welcome To Our Platform",
                "You have successfully registered. Enjoy our services",
                from_mail,
                [sent_to_email],
                html_message=email_html_template,
                fail_silently=False,
            )
        except Exception as e:
            print(e)

        # request = self._get_request()
        # setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""

        return super().save()


class CustomTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomText
        fields = "__all__"


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "username"]


class RequestResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=3)

    class Meta:
        model = User
        fields = ["email"]

    def validate(self, attrs):
        # try:
        #     email = attrs.get('email', '')
        #     print("sending...")

        #     if User.objects.filter(email=email).exists():
        #         user = User.objects.get(email=email)

        #         sent_to_email = email
        #         from_mail = settings.DEFAULT_FROM_EMAIL

        #         token = user.generate_jwt_token()
        #         reset_url = "https://chefmate-web.vercel.app"+"/reset/"+token+"/"

        #         html_tpl_path = "passwordreset.html"

        #         context = {'reset_url': reset_url}

        #         html_message = render_to_string(html_tpl_path, context)
        #         email_subject = 'Password reset for chefmate'
        #         print("sending...")
        #         send_verification_email(
        #             from_mail, sent_to_email, email_subject, html_message)

        # except Exception as e:
        #     print('errrrrr')
        #     print('error happened')
        #     print(f"{e}")
        #     return attrs
        try:
            email = attrs.get('email', '')
            if User.objects.filter(email=email).exists():
                print('exists')
                user = User.objects.get(email=email)
                sent_to_email = attrs.get('email', '')
                from_mail = settings.DEFAULT_FROM_EMAIL
                token = user.generate_jwt_token()
                reset_url = "https://chefmate-web.vercel.app"+"/reset/"+token+"/"
                html_tpl_path = "welcome.html"
                text_content = {}
                email_html_template = get_template(
                    html_tpl_path).render(text_content)
                send_mail(
                    "Chefmate App",
                    "Password reset",
                    from_mail,
                    [sent_to_email],
                    html_message=email_html_template,
                    fail_silently=False,
                )
                print('sent')
        except Exception as e:
            print(e)

        return super().validate(attrs)


class ResetPasswordEmailSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=20, min_length=6)

    class Meta:
        model = User
        fields = ["password"]


class UserDemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDemographics
        fields = "__all__"


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = PasswordResetForm

    """def get_email_options(self):
        try:
            return {
                'email_template_name': 'welcome.html'
            }
        except Exception as e:
            print(e)"""


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """

    user = UserSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ("key", "user")


# customer io - add customer or update
class AddCustomerIOSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=20, min_length=6)
    email = serializers.CharField(max_length=20, min_length=6)
    name = serializers.CharField(max_length=20, min_length=6)
    plan = serializers.CharField(max_length=20, min_length=6)

    class Meta:
        model = User
        fields = ["id", "email", "name", "plan"]

# customer io - add or update customer device


class AddCustomerIODeviceSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=20, min_length=6)
    device_id = serializers.CharField(max_length=200, min_length=6)
    platform = serializers.CharField(max_length=20, min_length=6)

    class Meta:
        model = User
        fields = ["id", "device_id", "platform"]


# customer io - get  customer messages


class CustomerIOCustomerMessagesSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = "__all__"
