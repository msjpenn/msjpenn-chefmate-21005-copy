# Generated by Django 2.2.20 on 2021-05-05 06:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0024_recipe_serving_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='difficulty_level',
        ),
    ]
