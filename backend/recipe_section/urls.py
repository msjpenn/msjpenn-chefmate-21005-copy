from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import RecipeSectionViewSet

router = DefaultRouter()
router.register("", RecipeSectionViewSet, basename="recipe_section")


app_name = "recipe_section"
urlpatterns = [
    path("", include(router.urls)),
]
