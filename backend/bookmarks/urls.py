from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import BookmarkGroupViewSet, BookmarkViewSet

router = DefaultRouter()
router.register("group", BookmarkGroupViewSet, basename="groups")
router.register("", BookmarkViewSet, basename="bookmarks")

app_name = "bookmarks"

urlpatterns = [
    path("", include(router.urls)),
]
