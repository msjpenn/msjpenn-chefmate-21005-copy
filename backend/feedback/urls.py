from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import FeedbackViewSet

router = DefaultRouter()
router.register("", FeedbackViewSet, basename="feedback")


app_name = "feedback"
urlpatterns = [
    path("", include(router.urls)),
]
