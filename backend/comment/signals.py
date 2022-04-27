from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Comment
from notification.models import Notification
from fcm_django.models import FCMDevice


@receiver(post_save, sender=Comment)
def send_notification(sender, instance, created, **kwargs):
    if created:
        notification_text = "{} commented your recipe.".format(
            instance.user.name,
        )
        if instance.user != instance.recipe.user:
            Notification.objects.create(
                user=instance.user,
                recipient=instance.recipe.user,
                recipe=instance.recipe,
                text=notification_text
            )
        fcm_devices = FCMDevice.objects.filter(
            user=instance.recipe.user
        )

        if fcm_devices.exists() and instance.user != instance.recipe.user:
            fcm_devices.send_message(
                title="New comment",
                body=notification_text,
                data={
                    'recipeId': instance.recipe.id,
                }
            )
