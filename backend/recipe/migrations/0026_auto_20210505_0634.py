# Generated by Django 2.2.20 on 2021-05-05 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0025_remove_recipe_difficulty_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='serving_size',
            field=models.IntegerField(),
        ),
    ]
