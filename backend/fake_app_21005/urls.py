"""fake_app_21005 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

urlpatterns = [
    path("", include("home.urls")),
    path("accounts/", include("allauth.urls")),
    path("activity/", include("actstream.urls")),
    path("api/v1/", include("home.api.v1.urls")),
    path("admin/", admin.site.urls),
    path("users/", include("users.urls", namespace="users")),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("recipe/", include("recipe.urls", namespace="recipe")),
    path("feed/", include("feed.urls", namespace="feed")),
    path("bookmarks/", include("bookmarks.urls", namespace="bookmarks")),
    path("comments/", include("comment.urls", namespace="comments")),
    path("notifications/", include("notification.urls", namespace="notifications")),
    path("grocery/", include("groceries.urls", namespace="groceries")),
    path("profile/", include("user_profile.urls", namespace="user-profile")),
    path("feedback/", include("feedback.urls", namespace="user-feedback")),
    path("reportrecipe/", include("report.urls", namespace="user-report")),
    path("category/", include("recipe_category.urls", namespace="recipe-category")),
    path("section/", include("recipe_section.urls", namespace="recipe-section")),
    path(
        "ingredient/", include("recipe_ingredient.urls",
                               namespace="recipe-ingredient")
    ),
]

admin.site.site_header = "Chefmate"
admin.site.site_title = "Chefmate Admin Portal"
admin.site.index_title = "Chefmate Admin"

# swagger
api_info = openapi.Info(
    title="Fake App API",
    default_version="v1",
    description="API documentation for Fake App App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger",
         cache_timeout=0), name="api_docs")
]
