from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import parsers, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework import pagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters
from django.db.models.query import Prefetch

from utils.serializer_utils import ChefmateListViewSet
from .serializers import (
    RecipeSerializer,
    RecipeLikesSerializer,
    RecipeWriteSerializer,
    RecipeImagesSerializer,
    RecipeInstructionSerializer,
    RecipeRatingSerializer,
    RecipeAIImageSerializer,
    RecipeAIWebsiteSerializer,
)
from .models import (
    Recipe,
    RecipeAIWebsiteURL,
    RecipeLikes,
    RecipeImages,
    RecipeInstruction,
    RecipeRatings,
    RecipeAIImage,
    RecipeAIWebsiteURL,
    RecipeAITask,
)
from users.models import (
    UserFollowing,
    User
)


class RecipeImagesViewSet(ModelViewSet):
    serializer_class = RecipeImagesSerializer
    queryset = RecipeImages.objects.all()
    parser_classes = (
        parsers.MultiPartParser,
        parsers.FormParser,
    )
    filterset_fields = ["recipe__id"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        serializer.save()

    def get_parsers(self):
        if getattr(self, "swagger_fake_view", False):
            return []

        return super().get_parsers()


class RecipeSetPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100


class RecipeViewSet(ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user__id", "id"]
    pagination_class = RecipeSetPagination
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if (
            self.action == "create"
            or self.action == "partial_update"
            or self.action == "update"
        ):
            return RecipeWriteSerializer
        return RecipeSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Recipe.objects.all()
        following_tab = self.request.query_params.get("following_tab")

        if following_tab:
            follower_user_ids = UserFollowing.objects.filter(following_user=user)\
                .values_list('user_id', flat=True)\
                .distinct()

            queryset = queryset.filter(user__in=follower_user_ids)

            return queryset

        return queryset


class RecipeLikesViewSet(ModelViewSet):
    serializer_class = RecipeLikesSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = RecipeLikes.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user__id", "recipe__id"]

    def delete(self, request, format=None):
        recipe = self.request.query_params.get("recipe")
        try:
            likes = RecipeLikes.objects.get(
                user=request.user.id, recipe=recipe)
            likes.delete()
            return Response(status=status.HTTP_200_OK)
        except RecipeLikes.DoesNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


class RecipeRecreationViewSet(ChefmateListViewSet):
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user__id", "recreated_from"]

    def get_queryset(self):
        return Recipe.objects.filter(recreated_from__isnull=False)

    def get_serializer_class(self):
        return RecipeSerializer


class RecipeInstructionViewSet(ModelViewSet):
    serializer_class = RecipeInstructionSerializer
    queryset = RecipeInstruction.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "section__id",
        "section__recipe__id",
    ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class RecipeRatingViewSet(ModelViewSet):
    serializer_class = RecipeRatingSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = RecipeRatings.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user__id", "recipe__id"]


class RecipeAIImageViewSet(ModelViewSet):
    serializer_class = RecipeAIImageSerializer
    queryset = RecipeAIImage.objects.all()


class RecipeAIWebsiteViewSet(ModelViewSet):
    serializer_class = RecipeAIWebsiteSerializer
    queryset = RecipeAIWebsiteURL.objects.all()


class ScaleAIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, **kwargs):
        if request.data:
            annotations = request.data.get(
                "response", {}).get("annotations", {})
            if annotations:
                ingredients = annotations.get("ingredients", {})
                instructions = annotations.get("instructions", {})

            recipe_ai_task = RecipeAITask.objects.filter(
                id=kwargs.get("id")).first()

            if recipe_ai_task:
                try:
                    is_done = (
                        recipe_ai_task.recipe.create_ingredients_annd_instructions(
                            ingredients, instructions
                        )
                    )

                    if is_done:
                        recipe_ai_task.status = RecipeAITask.STATUS_DONE
                        recipe_ai_task.extra_data = request.data
                        recipe_ai_task.save()
                        recipe_ai_task.recipe.is_draft = False
                        recipe_ai_task.recipe.save()

                        return Response(
                            "Successfuly processed request to Chefmate.",
                            status=status.HTTP_200_OK,
                        )
                except Exception as err:
                    recipe_ai_task.error_response = err
                    recipe_ai_task.status = RecipeAITask.STATUS_REJECTED
                    recipe_ai_task.save()

        return Response(
            "Your request to chefmate failed to process",
            status=status.HTTP_400_BAD_REQUEST,
        )
