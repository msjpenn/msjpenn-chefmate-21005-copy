from collections import namedtuple

from rest_framework import viewsets, mixins
from rest_framework.response import Response

from django.contrib.auth import get_user_model


from recipe.models import Recipe
from feed.serializers import SearchFeedSerializer

Search = namedtuple("Timeline", ("users", "recipes"))


class ChefmateListViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    pass


class ChefmateDetailViewSet(mixins.RetrieveModelMixin):
    pass


class ChefmateSearchViewSet(
    viewsets.ViewSet,
    mixins.ListModelMixin,
):
    def list(self, request):
        timeline = Search(
            users=get_user_model().objects.all().order_by("-id"),
            recipes=Recipe.objects.all().order_by("-id"),
        )
        serializer = SearchFeedSerializer(timeline)
        return Response(serializer.data)


class ChefmateUpdateViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    pass