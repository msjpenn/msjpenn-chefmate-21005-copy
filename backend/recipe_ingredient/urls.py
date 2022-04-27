from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import IngredientsViewSet

router = DefaultRouter()
router.register("", IngredientsViewSet, basename="recipe_ingredient")


app_name = "recipe_ingredient"
urlpatterns = [
    path("", include(router.urls)),
]
