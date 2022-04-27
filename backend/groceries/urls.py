from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import GroceryViewSet

router = DefaultRouter()
router.register("", GroceryViewSet, basename="grocery")


app_name = "grocery"
urlpatterns = [
    path("", include(router.urls)),
]
