from django.db import models
from utils.models import BaseModel
from django.conf import settings
from recipe.models import Recipe

# Create your models here.


class Notification(BaseModel):
    #  Relationships
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_notification',
        blank=True,
        null=True,
    )

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_recipient',
        blank=True,
        null=True,
    )

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="recipe_notification",
    )

    text = models.TextField(max_length=400)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return str(self.pk)
