from django.urls import path
from .views import home, info, privacy, terms

urlpatterns = [
    path("", home, name="home"),
    path("privacy", privacy, name="privacy"),
    path("terms", terms, name="terms"),
    path("info", info, name="info"),
]
