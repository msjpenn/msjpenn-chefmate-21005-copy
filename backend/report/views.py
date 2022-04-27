from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import Report
from .serializer import ReportSerializer


class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "user__id", "recipe__id"
    ]
