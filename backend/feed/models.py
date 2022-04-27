from django.db import models
from django.conf import settings

from utils.models import BaseModel


class Activity(BaseModel):
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_activity_actor",
    )

    class Meta:
        verbose_name = "Activity"
        verbose_name_plural = "Activities"

    def __unicode__(self):
        return "%s" % self.actor.username

    def __str__(self):
        return f"{self.actor.username}"