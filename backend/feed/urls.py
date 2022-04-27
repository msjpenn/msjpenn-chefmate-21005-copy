from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import FeedViewSet, SearchViewSet

router = DefaultRouter()
router.register("all", FeedViewSet, basename="feed")
router.register("search", SearchViewSet, basename="search")

app_name = "feed"

urlpatterns = [
    path("", include(router.urls)),
]
