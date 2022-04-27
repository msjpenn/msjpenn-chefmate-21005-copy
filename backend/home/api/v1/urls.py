from django.urls import path, include
from rest_framework.routers import DefaultRouter
from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet
from .viewsets import (
    SignupViewSet,
    LoginViewSet,
    HomePageViewSet,
    CustomTextViewSet,
    RequestPasswordResetViewSet,
    PasswordResetViewSet,
    AddCustomerIOViewSet,
    AddCustomerIODeviceViewSet,
    CustomerIOCustomerMessagesViewSet

)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
# router.register("loginw", LoginViewSet, basename="login")
router.register(r'devices', FCMDeviceAuthorizedViewSet)
# router.register("password-reset", RequestPasswordResetViewSet,
#                 basename="password-reset")
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)

urlpatterns = [
    path("", include(router.urls)),

    path('customer-io/', AddCustomerIOViewSet.as_view()),
    path('customer-io-device/', AddCustomerIODeviceViewSet.as_view()),
    path('customer-io-messages/', CustomerIOCustomerMessagesViewSet.as_view()),

    path('password-reset/', RequestPasswordResetViewSet.as_view()),
    path('password/<str:token>/reset/',
         PasswordResetViewSet.as_view()),

]
