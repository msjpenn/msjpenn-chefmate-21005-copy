from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import Notification
from .serializer import NotificationSerializer, NotificationWriteSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer

    def get_serializer_class(self):
        if self.action == "create" or self.action == 'partial_update' or self.action == 'update':
            return NotificationWriteSerializer
        return NotificationSerializer

    def get_queryset(self):
        queryset = Notification.objects.filter(recipient=self.request.user)
        return queryset
