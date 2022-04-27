from drf_multiple_model.viewsets import ObjectMultipleModelAPIViewSet
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination

from utils.serializer_utils import ChefmateListViewSet, ChefmateSearchViewSet
from .serializers import FeedSerializer, SearchFeedSerializer
from recipe.models import Recipe
from django.contrib.auth import get_user_model
from recipe.serializers import RecipeSerializer
from users.serializers import UserProfileSerializer


class LimitPagination(MultipleModelLimitOffsetPagination):
    default_limit = 5


class FeedViewSet(ChefmateListViewSet):
    def get_queryset(self):
        return Recipe.objects.all()

    def get_serializer_class(self):
        return FeedSerializer


class SearchViewSet(ObjectMultipleModelAPIViewSet):
    pagination_class = LimitPagination
    querylist = [
        {
            "queryset": get_user_model().objects.all(),
            "serializer_class": UserProfileSerializer,
        },
        {"queryset": Recipe.objects.all(), "serializer_class": FeedSerializer},
    ]

    def get_querylist(self):
        querylist = [
            {
                "queryset": get_user_model().objects.all(),
                "serializer_class": UserProfileSerializer,
            },
            {"queryset": Recipe.objects.all(), "serializer_class": FeedSerializer},
        ]
        # Get query
        query = self.request.query_params.get("search")
        if query:
            querylist = [
                {
                    "queryset": get_user_model().objects.filter(name__icontains=query),
                    "serializer_class": UserProfileSerializer,
                },
                {
                    "queryset": Recipe.objects.filter(title__icontains=query),
                    "serializer_class": FeedSerializer,
                },
            ]

        return querylist
