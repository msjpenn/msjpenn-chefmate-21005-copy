# Generated by Django 2.2.19 on 2021-03-10 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0018_recipeinstruction'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipeinstruction',
            name='description',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
    ]
