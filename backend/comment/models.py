from django.db import models
from django.conf import settings

from utils.models import BaseModel
from recipe.models import Recipe


class Comment(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="user_comment",
    )
    body = models.TextField(blank=True, null=True, max_length=255)
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="recipe_comment"
    )
    is_reported = models.BooleanField(default=False, blank=True, null=True)

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"

    def __unicode__(self):
        return "%s" % self.recipe.title

    def __str__(self):
        return f"{self.recipe}"
