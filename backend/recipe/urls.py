from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    RecipeViewSet,
    RecipeLikesViewSet,
    RecipeRecreationViewSet,
    RecipeImagesViewSet,
    RecipeInstructionViewSet,
    RecipeRatingViewSet,
    RecipeAIImageViewSet,
    RecipeAIWebsiteViewSet,
    ScaleAIView,
)

router = DefaultRouter()
router.register("", RecipeViewSet, basename="recipe")
router.register("user/likes", RecipeLikesViewSet, basename="recipe-likes")
router.register("images/recipe", RecipeImagesViewSet, basename="recipe-images")
router.register("user/rate", RecipeRatingViewSet, basename="recipe-ratings")
# router.register("section/recipe", RecipeSectionViewSet, basename="recipe-section")
router.register(
    "instruction/recipe/steps", RecipeInstructionViewSet, basename="recipe-instruction"
)
router.register(
    "user/recreation",
    RecipeRecreationViewSet,
    basename="recipe-recreation",
)
router.register("ai/image", RecipeAIImageViewSet, basename="recipe-ai-image")
router.register("ai/website", RecipeAIWebsiteViewSet, basename="recipe-ai-website")

app_name = "recipe"
urlpatterns = [
    path("", include(router.urls)),
    path("scale/tasks/<int:id>", ScaleAIView.as_view(), name="scale-tasks"),
]
