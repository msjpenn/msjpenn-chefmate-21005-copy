import jwt
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from datetime import datetime, time, timedelta


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True,
                            null=True, max_length=255)
    is_trusted = models.BooleanField(default=False)
    social_id = models.CharField(null=True, max_length=255)
    apple_id = models.CharField(null=True, max_length=255)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def generate_jwt_token(self):
        """
        This method generates a JWT token
        """

        exp_time = datetime.now() + timedelta(hours=3)
        token = jwt.encode({
            'id': self.pk,
            'email': self.email,
            'exp': int(exp_time.strftime('%s'))
        }, 'secret', algorithm='HS256')  # change secret
        return token


class UserDemographics(models.Model):

    METRIC = 'metric'
    CUSTOMARY = 'customary'
    MEASURING_SYSTEMS_CHOICES = (
        (METRIC, "metric"),
        (CUSTOMARY, "customary"),
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="users_demo"
    )
    image = models.ImageField(upload_to="user_images/", blank=True, null=True)
    mobile = models.CharField(
        unique=False, max_length=20, blank=False, default="")

    push_notifications = models.BooleanField(default=True)

    measurement_system = models.CharField(
        max_length=20,
        choices=MEASURING_SYSTEMS_CHOICES,
        null=True,
        blank=True,
        default='metric',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


class CategoryMaster(models.Model):
    image = models.ImageField(
        upload_to="category_images/", blank=True, null=True)
    name = models.CharField(max_length=200, blank=False, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UserCategory(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="users")
    category = models.ForeignKey(
        CategoryMaster, on_delete=models.CASCADE, related_name="categoryName"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "category")


class TermsAndConditions(models.Model):
    header = models.CharField(max_length=1000, blank=True, default="")
    data = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class UserFollowing(models.Model):

    user = models.ForeignKey(
        User, related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey(
        User, related_name="followers", on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        unique_together = ("user", "following_user")
        ordering = ["-created"]

    def __str__(self):
        return f"{self.user} follows {self.following_user}"

    def __unicode__(self):
        return f"{self.user} is following {self.following_user}"
