from os import error
from home.models import CustomText, HomePage
from .serializers import (
    SignupSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    User,
    UserSerializer,
    UserDemographicsSerializer,
    RequestResetPasswordEmailSerializer,
    ResetPasswordEmailSerializer,
    AddCustomerIODeviceSerializer,
    AddCustomerIOSerializer,
    CustomerIOCustomerMessagesSerializer
)
import jwt
import http.client
import ssl
from django.conf import settings
from django.shortcuts import HttpResponse
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from users.models import UserDemographics
from rest_framework import generics
from rest_framework import status
from customerio import CustomerIO, Regions
cio = CustomerIO(settings.CUSTOMER_IO_SITE_ID,
                 settings.CUSTOMER_IO_API_KEY, region=Regions.US)

# ssl._create_default_https_context = ssl._create_unverified_context


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]
    permission_classes = (AllowAny,)


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer
    permission_classes = (AllowAny,)

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        try:
            user_demographics = UserDemographics.objects.get(user_id=user.id)
        except UserDemographics.DoesNotExist:
            return Response({"token": token.key, "user": user_serializer.data})
        user_demographics_serializer = UserDemographicsSerializer(
            user_demographics)
        return Response(
            {
                "token": token.key,
                "user": user_serializer.data,
                "user_data": user_demographics_serializer.data,
            }
        )


class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class RequestPasswordResetViewSet(APIView):
    serializer_class = RequestResetPasswordEmailSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"Message": "Your reset link has been sent to your email"}, status=status.HTTP_200_OK)


class PasswordResetViewSet(APIView):
    serializer_class = ResetPasswordEmailSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        print('reseting password')
        token = kwargs.pop('token')
        password = request.data['password']
        print(password)
        try:
            user = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            return Response({'error': 'token expired'})

        user_detail = User.objects.get(pk=user['id'])

        user_detail.set_password(password)
        user_detail.save()

        print(request.data)
        return Response({"Message": "Your password has been reset successfully"}, status=status.HTTP_200_OK)


"""
Adding or updating customer IO
"""


class AddCustomerIOViewSet(APIView):
    serializer_class = AddCustomerIOSerializer
    # permission_classes = (AllowAny,)

    def post(self, request):
        id = request.data['id']
        name = request.data['name']
        email = request.data['email']
        plan = request.data['plan']
        try:
            cio.identify(id=id, email=email, name=name, plan=plan)
            return Response({"Message": "User successfully added to customer io"}, status=status.HTTP_200_OK)
        except:
            print('something went wrong add customer')


"""
Adding or updating customer IO device
"""


class AddCustomerIODeviceViewSet(APIView):
    serializer_class = CustomerIOCustomerMessagesSerializer

    def post(self, request):
        device_id = request.data['device_id']
        platform = request.data['platform']
        customer_id = request.data['customer_id']
        try:
            cio.add_device(customer_id=customer_id,
                           device_id=device_id, platform=platform)
            return Response({"Message": "Successfully added customer device to customer io"}, status=status.HTTP_200_OK)
        except:
            print('something went wrong add customer')


"""
Adding or updating customer IO device
"""


class CustomerIOCustomerMessagesViewSet(APIView):
    serializer_class = AddCustomerIODeviceSerializer

    def get(self, request):
        customer_id = '3'
        print("getting sms")
        try:
            conn = http.client.HTTPSConnection("beta-api.customer.io")
            print("getting sms conn")

            headers = {
                'Authorization': "Bearer 6e6cb53b38585272999af05954dd148a"}

            conn.request(
                "GET", "/v1/api/customers/3/messages", headers=headers)
            print("getting sms request")

            res = conn.getresponse()
            print("getting sms res")

            data = res.read()

            print(data.decode("utf-8"))
            return Response({"Message": "Customer messages", "data": data.decode("utf-8")}, status=status.HTTP_200_OK)
        except Exception as e:
            print('error happened')
            print(f"{e}")

            return HttpResponse(f"{e}")
