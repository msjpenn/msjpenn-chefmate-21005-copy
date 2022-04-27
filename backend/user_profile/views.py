from rest_framework.viewsets import ReadOnlyModelViewSet

from django.contrib.auth import get_user_model


from .serializers import UserProfileReadSerializer, SelfUserProfilerReadSerializer
from utils.serializer_utils import ChefmateDetailViewSet


class UserProfileViewSet(ReadOnlyModelViewSet):
    serializer_class = UserProfileReadSerializer
    queryset = get_user_model().objects.all()


class SelfUserProfilerViewSet(ReadOnlyModelViewSet):
    serializer_class = SelfUserProfilerReadSerializer
    queryset = get_user_model().objects.all()