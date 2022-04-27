from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import RecipeCategory
from .serializers import RecipeCategorySerializer


class RecipeCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeCategorySerializer
    queryset = RecipeCategory.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "recipe__id",
    ]

    @action(detail=False, methods=["delete"])
    def delete_all(self, request):
        result = RecipeCategory.objects.filter(
            recipe=request.query_params.get("recipe__id")
        ).delete()
        # TODO: May be some check is needed here
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )