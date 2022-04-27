from rest_framework import viewsets, filters, serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status

from .serializers import CommentBaseSerializer, CommentSerializer
from .models import Comment


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentBaseSerializer
    queryset = Comment.objects.all()
    filter_backends = [filters.SearchFilter]
    filterset_fields = ["user__id", "recipe__id"]

    def get_serializer_class(self):
        print("action...", self.action)
        if self.action == "list":
            return CommentSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save()

    def delete(self, request, format=None):
        recipe = self.request.query_params.get('recipe')
        try:
            comment = Comment.objects.get(
                user=request.user.id, recipe=recipe)
            comment.delete()
            return Response(status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)
