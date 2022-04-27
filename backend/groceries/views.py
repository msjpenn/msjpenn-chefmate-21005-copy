from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import Grocery
from .serializers import GrocerySerializer


class GroceryViewSet(viewsets.ModelViewSet):
    pagination_class = None
    serializer_class = GrocerySerializer
    queryset = Grocery.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "user__id",
        "available",
        "crossed",
    ]

    @action(detail=False, methods=["delete"])
    def delete_all(self, request):
        result = Grocery.objects.filter(
            user=request.query_params.get("user__id"), crossed=True
        ).delete()
        # TODO: May be some check is needed here
        return Response(status=status.HTTP_204_NO_CONTENT)
