from django.core.exceptions import ValidationError
from django.core.management import BaseCommand

from home.utils.scale import ScaleService
from home.utils.exceptions import ScaleException
from recipe.models import RecipeAITask


class Command(BaseCommand):
    help = (
        """Call Scale services to create a batch, create tasks and finalize the batch"""
    )

    def handle(self, *args, **options):
        scale = ScaleService()

        image_recipes = RecipeAITask.objects.filter(
            status=RecipeAITask.STATUS_CREATED, type=RecipeAITask.TYPE_IMAGE
        )

        website_recipes = RecipeAITask.objects.filter(
            status=RecipeAITask.STATUS_CREATED, type=RecipeAITask.TYPE_WEBSITE
        )

        dummy_image_tasks_number = (
            10 - image_recipes.count() if image_recipes.count() < 10 else 0
        )

        dummy_website_tasks_number = (
            10 - website_recipes.count() if website_recipes.count() < 10 else 0
        )

        if image_recipes.exists():
            # Create Recipe Image Batch
            try:
                image_batch = scale.create_image_batch()
            except ScaleException as error:
                raise ValidationError(f"Error occured with Scale, {error}")

            image_batch_name = image_batch.json().get("name")
            for image_recipe in image_recipes:
                # Create Recipe Image Tasks
                attachments = [
                    ai_images.picture.url for ai_images in image_recipe.ai_images.all()
                ]

                try:
                    task_response = scale.create_image_task(
                        attachments, image_batch_name, image_recipe.id
                    )
                    image_recipe.status = RecipeAITask.STATUS_PENDING
                    image_recipe.scale_task_id = task_response.json().get("task_id")
                    image_recipe.save()
                except ScaleException as error:
                    raise ValidationError(f"Error occured with Scale, {error}")

            # Create dummy tasks if necessary
            if dummy_image_tasks_number:
                attachments = [
                    "https://chefmate.s3.us-east-2.amazonaws.com/media/uploads/recipeaiimage/054190f1-c71a-4dce-9e60-f5a7041ae1af.png"
                ]
                for _ in range(dummy_image_tasks_number):
                    try:
                        task_response = scale.create_image_task(
                            attachments, image_batch_name, 0
                        )
                    except ScaleException as error:
                        raise ValidationError(f"Error occured with Scale, {error}")

            # Finalize Recipe Image Tasks
            try:
                scale.finalize_batch(image_batch_name)
            except ScaleException as error:
                raise ValidationError(f"Error occured with Scale, {error}")

        if website_recipes.exists():
            # Create Recipe Website Batch
            try:
                url_batch = scale.create_url_batch()
            except ScaleException as error:
                raise ValidationError(f"Error occured with Scale, {error}")

            url_batch_name = url_batch.json().get("name")
            for website_recipe in website_recipes:
                # Create Recipe Webiste Tasks
                attachments = [
                    ai_websites.website_url
                    for ai_websites in website_recipe.ai_websites.all()
                ]

                try:
                    task_response = scale.create_url_task(
                        attachments, url_batch_name, website_recipe.id
                    )
                    website_recipe.status = RecipeAITask.STATUS_PENDING
                    website_recipe.scale_task_id = task_response.json().get("task_id")
                    website_recipe.save()
                except ScaleException as error:
                    raise ValidationError(f"Error occured with Scale, {error}")

            # Create dummy tasks if necessary
            if dummy_website_tasks_number:
                attachments = ["https://www.google.com/"]
                for _ in range(dummy_website_tasks_number):
                    try:
                        task_response = scale.create_url_task(
                            attachments, url_batch_name, 0
                        )
                    except ScaleException as error:
                        raise ValidationError(f"Error occured with Scale, {error}")

            # Finalize Recipe Tasks
            try:
                scale.finalize_batch(url_batch_name)
            except ScaleException as error:
                raise ValidationError(f"Error occured with Scale, {error}")
