from django.db import models
from django.conf import settings

from utils.models import BaseModel


class Grocery(BaseModel):
    name = models.CharField(max_length=255)
    quantity = models.CharField(max_length=50)
    available = models.BooleanField(default=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_grocery"
    )
    crossed = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Grocery"
        verbose_name_plural = "Groceries"

    def __unicode__(self):
        return "%s" % self.name

    def __str__(self):
        return f"{self.name}"
