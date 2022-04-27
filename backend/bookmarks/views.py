from rest_framework import viewsets, filters, serializers
from django_filters.rest_framework import DjangoFilterBackend


from .serializers import (
    BookmarkGroupSerializer,
    BookmarkSerializer,
    BookmarkBaseSerializer,
)
from .models import BookmarkGroup, Bookmark


class BookmarkGroupViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkGroupSerializer
    queryset = BookmarkGroup.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user__id"]


class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkBaseSerializer
    queryset = Bookmark.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return BookmarkSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        queryset = Bookmark.objects.all()
        if "user" in self.request.query_params:
            user_id = self.request.query_params["user"]
            # print(self.request.query_params)
            queryset = queryset.filter(user__id=user_id)

        if "group" in self.request.query_params:
            queryset = queryset.filter(
                group__id=self.request.query_params["group"])

        if "difficulty" in self.request.query_params:
            queryset = queryset.filter(
                recipe__difficulty=self.request.query_params["difficulty"]
            )

        return queryset
