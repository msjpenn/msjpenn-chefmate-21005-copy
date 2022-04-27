from django.db import models
from django.conf import settings

from utils.models import BaseModel
from recipe.models import Recipe


class BookmarkGroup(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="user_bookmark_group",
    )
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Bookmark Group"
        verbose_name_plural = "Bookmark Groups"

    def __unicode__(self):
        return "%s" % self.name

    def __str__(self):
        return f"{self.name}"


class Bookmark(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="user_bookmark",
    )
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="recipe_bookmark"
    )
    group = models.ForeignKey(
        BookmarkGroup,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="group_bookmark",
    )

    class Meta:
        verbose_name = "Bookmark"
        verbose_name_plural = "Bookmarks"
        unique_together = [["recipe", "user"]]

    def __unicode__(self):
        return f"{self.recipe.title} by user : {self.user.username}"

    def __str__(self):
        return f"{self.recipe.title}, bookmarked by user : {self.user.username}"
