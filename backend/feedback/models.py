from django.db import models
from django.conf import settings

from utils.models import BaseModel
from recipe.models import Recipe


class Feedback(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_feedback",
        null=True,
        blank=True,
    )
    body = models.TextField(blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = "Feedback"
        verbose_name_plural = "Feedback's"

    def __unicode__(self):
        return f"{self.user}"

    def __str__(self):
        return f"{self.user}"