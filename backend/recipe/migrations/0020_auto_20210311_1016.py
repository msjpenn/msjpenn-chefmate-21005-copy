# Generated by Django 2.2.19 on 2021-03-11 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0019_recipeinstruction_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='difficulty',
            new_name='difficulty_level',
        ),
    ]
