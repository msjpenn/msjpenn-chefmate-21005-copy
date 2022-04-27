from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import UserProfileViewSet, SelfUserProfilerViewSet

router = DefaultRouter()
router.register("", UserProfileViewSet, basename="user-profile")
router.register("self/profile", SelfUserProfilerViewSet,
                basename="user-self-profile")


app_name = "user_profile"
urlpatterns = [
    path("", include(router.urls)),
]
