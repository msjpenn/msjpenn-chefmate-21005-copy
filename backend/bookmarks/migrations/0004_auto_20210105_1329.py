# Generated by Django 2.2.17 on 2021-01-05 13:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipe', '0009_auto_20201226_1632'),
        ('bookmarks', '0003_auto_20210105_1327'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='bookmark',
            unique_together={('recipe', 'user')},
        ),
    ]
