# Generated by Django 2.2.19 on 2021-04-12 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0021_auto_20210410_1352'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='total_hours_to_make',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]