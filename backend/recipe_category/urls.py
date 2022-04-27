from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import RecipeCategoryViewSet

router = DefaultRouter()
router.register("", RecipeCategoryViewSet, basename="recipe_category")


app_name = "recipe_category"
urlpatterns = [
    path("", include(router.urls)),
]
