from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from recipe.models import RecipeSection
from .serializers import RecipeSectionsSerializer


class RecipeSectionViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSectionsSerializer
    queryset = RecipeSection.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "recipe__id",
        "name",
    ]
