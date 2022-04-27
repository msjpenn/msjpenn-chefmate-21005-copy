from recipe.models import Recipe
from django.db import models
from django.conf import settings

from utils.models import BaseModel


# Create your models here.
class Report(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_reporter",
        null=True,
        blank=True,
    )

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_reported",
        db_index=True,
    )

    reason = models.TextField(blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = "Report"
        verbose_name_plural = "Reporters"

    def __unicode__(self):
        return f"{self.user}"

    def __str__(self):
        return f"{self.user}"
