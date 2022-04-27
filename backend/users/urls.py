from django.urls import path, include

from rest_framework.routers import DefaultRouter


from .views import (
    AppleLogin,
    user_redirect_view,
    user_update_view,
    user_detail_view,
    UploadUserImageView,
    ChangeUsernameView,
    TermsAndConditionsView,
    CategoryMasterView,
    UploadUserPhoneNumberView,
    UserCategoryView,
    FollowView,
    UnfollowView,
    GetUserFollowerFollowingView,
    GetFriendsView,
    AddMeasurementView,
    UserProfileView,
    AllUsersProfileView,
    DownloadS3FileView,
    FacebookLogin,
    GoogleLogin,
    UserMultiCategoryView,
    FollowAllView,
    NewUserFollowingViewSet,
    NewUserUpdateViewSet,
    EditMeasurementView,
    PushNotificationView
)

router = DefaultRouter()
router.register("follow", NewUserFollowingViewSet, basename="follow")
router.register("profile", NewUserUpdateViewSet, basename="new-user-profile")

app_name = "users"
urlpatterns = [
    path("facebook-login/", view=FacebookLogin.as_view(), name="facebook-login"),
    path("google-login/", view=GoogleLogin.as_view(), name="google-login"),
    path("apple-login/", view=AppleLogin.as_view(), name="apple-login"),
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    path("upload/image", UploadUserImageView.as_view(), name="UploadImage"),
    path(
        "reset/username/<int:pk>/", ChangeUsernameView.as_view(), name="ResetUsername"
    ),
    path(
        "terms/conditions", TermsAndConditionsView.as_view(), name="TermsAndConditions"
    ),
    path("category", CategoryMasterView.as_view(), name="CategoryMaster"),
    path("user/category", UserCategoryView.as_view(), name="UserCategory"),
    path("phone/number", UploadUserPhoneNumberView.as_view(),
         name="UploadPhoneNumber"),
    # path("follow", FollowView.as_view(), name="FollowUser"),
    # path("unfollow", UnfollowView.as_view(), name="UnfollowUser"),
    path(
        "follower-following/data",
        GetUserFollowerFollowingView.as_view(),
        name="GetUserFollowerFollowing",
    ),
    path("friends", GetFriendsView.as_view(), name="GetFriends"),
    path("measurement", EditMeasurementView.as_view(), name="Measurement"),
    path("push", PushNotificationView.as_view(), name="Push"),
    path("profile", UserProfileView.as_view(), name="UserProfile"),
    path("all-users", AllUsersProfileView.as_view(), name="AllUsers"),
    path("download/file", DownloadS3FileView.as_view(), name="DownloadS3File"),
    path("multi/category", UserMultiCategoryView.as_view(), name="UserCategory"),
    # path("follow/all", FollowAllView.as_view(), name="UserFollowAll"),
    path("user/", include(router.urls)),
]
