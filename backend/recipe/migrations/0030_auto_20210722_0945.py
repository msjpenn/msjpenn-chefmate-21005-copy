# Generated by Django 2.2.24 on 2021-07-22 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0029_auto_20210614_1109'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipeaitask',
            name='error_message',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='recipeaitask',
            name='error_response',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='serving_size',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]