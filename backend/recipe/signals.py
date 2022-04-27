from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RecipeLikes
from notification.models import Notification
from fcm_django.models import FCMDevice


@receiver(post_save, sender=RecipeLikes)
def send_notification(sender, instance, created, **kwargs):
    if created:
        fcm_devices = FCMDevice.objects.filter(
            user=instance.recipe.user
        )
        notification_text = "{} liked your recipe.".format(
            instance.user.name,
        )
        if instance.user != instance.recipe.user:
            Notification.objects.create(
                user=instance.user,
                recipient=instance.recipe.user,
                recipe=instance.recipe,
                text=notification_text
            )

        if fcm_devices.exists() and instance.user != instance.recipe.user:
            fcm_devices.send_message(
                title="New Like",
                body=notification_text,
                data={
                    'recipeId': instance.recipe.id,
                }
            )
