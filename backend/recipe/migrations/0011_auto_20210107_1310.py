# Generated by Django 2.2.17 on 2021-01-07 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0010_recipe_unit'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='unit',
            new_name='difficulty',
        ),
    ]
