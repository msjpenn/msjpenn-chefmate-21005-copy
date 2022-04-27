from django.db.models.signals import post_save
from django.dispatch import receiver

from comment.models import Comment


@receiver(post_save, sender=Comment)
def create_user_profile(sender, instance, created, **kwargs):
    pass
