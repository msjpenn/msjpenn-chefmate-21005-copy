import uuid
import os

from django.conf import settings


def get_upload_path(instance, filename):
    extension = filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    if settings.USE_S3:
        return os.path.join("uploads", instance.__class__.__name__.lower(), filename)

    return os.path.join(instance.__class__.__name__.lower(), filename)
    