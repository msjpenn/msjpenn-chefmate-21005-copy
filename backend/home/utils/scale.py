import datetime
import requests

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse


class ScaleService:
    today = datetime.date.today()

    base_url = "https://api.scale.com/v1"
    scale_url = f"{base_url}/task/textcollection"
    domain = get_current_site(None).domain

    def create_image_batch(self):
        batch_name = f"images_{self.today}"

        url = f"{self.base_url}/batches"

        payload = {"project": settings.SCALE_PROJECT_NAME_IMAGE, "name": batch_name}
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        response = requests.request(
            "POST",
            url,
            json=payload,
            headers=headers,
            auth=(settings.SCALE_API_KEY, ""),
        )

        return response

    def create_url_batch(self):
        batch_name = f"url_{self.today}"

        url = f"{self.base_url}/batches"

        payload = {
            "project": settings.SCALE_PROJECT_NAME_WEBSITE,
            "name": batch_name,
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        response = requests.request(
            "POST",
            url,
            json=payload,
            headers=headers,
            auth=(settings.SCALE_API_KEY, ""),
        )

        return response

    def create_image_task(self, attachments, batch_name, image_recipe_id):
        url = reverse("recipe:scale-tasks", kwargs={"id": image_recipe_id})
        fields = [
            {
                "field_id": "ingredients",
                "title": "Ingredients",
                "description": "Add all ingredients in the attached picture of the recipe (generally top to bottom)",
                "required": "true",
                "type": "field_set",
                "fields": [
                    {
                        "field_id": "name",
                        "title": "Ingredient name",
                        "required": "true",
                        "type": "text",
                    },
                    {
                        "field_id": "amount",
                        "title": "Amount",
                        "type": "text",
                    },
                    {
                        "field_id": "unit",
                        "title": "Unit",
                        "type": "select",
                        "choices": [
                            "cup",
                            "gallon",
                            "gram",
                            "kilogram",
                            "liter",
                            "mililiter",
                            "ounce",
                            "piece",
                            "pinch",
                            "pint",
                            "pound",
                            "quart",
                            "slice",
                            "tablespoon",
                            "teaspoon",
                            "other unit",
                        ],
                    },
                    {
                        "field_id": "other_unit",
                        "title": "Other",
                        "description": "If you selected 'other' in unit, input the unit of the ingredient here",
                        "type": "text",
                    },
                ],
            },
            {"field_id": "instructions", "title": "Instructions", "type": "text"},
        ]
        attachment_list = [
            {"type": "image", "content": attachment} for attachment in attachments
        ]

        payload = {
            "batch": batch_name,
            "fields": fields,
            "attachments": attachment_list,
            "response_required": 1,
            "priority": 30,
            "callback_url": f"{self.domain}{url}",
            "instruction": settings.SCALE_IMAGE_INSTRUCTIONS,
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        response = requests.request(
            "POST",
            url=self.scale_url,
            json=payload,
            headers=headers,
            auth=(settings.SCALE_API_KEY, ""),
        )

        return response

    def create_url_task(self, attachments, batch_name, url_recipe_id):
        url = reverse("recipe:scale-tasks", kwargs={"id": url_recipe_id})
        fields = [
            {
                "field_id": "ingredients",
                "title": "Ingredients",
                "description": "Add all ingredients in the attached picture of the recipe (generally top to bottom)",
                "required": "true",
                "type": "field_set",
                "fields": [
                    {
                        "field_id": "name",
                        "title": "Ingredient name",
                        "required": "true",
                        "type": "text",
                    },
                    {
                        "field_id": "amount",
                        "title": "Amount",
                        "type": "text",
                    },
                    {
                        "field_id": "unit",
                        "title": "Unit",
                        "type": "select",
                        "choices": [
                            "cup",
                            "gallon",
                            "gram",
                            "kilogram",
                            "liter",
                            "mililiter",
                            "ounce",
                            "piece",
                            "pinch",
                            "pint",
                            "pound",
                            "quart",
                            "slice",
                            "tablespoon",
                            "teaspoon",
                            "other unit",
                        ],
                    },
                    {
                        "field_id": "other_unit",
                        "title": "Other",
                        "description": "If you selected 'other' in unit, input the unit of the ingredient here",
                        "type": "text",
                    },
                ],
            },
            {"field_id": "instructions", "title": "Instructions", "type": "text"},
        ]
        attachment_list = [
            {"type": "website", "content": attachment} for attachment in attachments
        ]
        payload = {
            "batch": batch_name,
            "fields": fields,
            "attachments": attachment_list,
            "response_required": 1,
            "priority": 30,
            "callback_url": f"{self.domain}{url}",
            "instruction": settings.SCALE_WEBSITE_INSTRUCTIONS,
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        response = requests.request(
            "POST",
            url=self.scale_url,
            json=payload,
            headers=headers,
            auth=(settings.SCALE_API_KEY, ""),
        )

        return response

    def finalize_batch(self, batch_name):
        url = f"https://api.scale.com/v1/batches/{batch_name}/finalize"

        headers = {
            "Accept": "application/json",
        }

        response = requests.request(
            "POST",
            url,
            headers=headers,
            auth=(settings.SCALE_API_KEY, ""),
        )

        return response
