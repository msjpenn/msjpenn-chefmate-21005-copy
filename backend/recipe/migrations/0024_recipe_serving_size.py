# Generated by Django 2.2.20 on 2021-04-16 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0023_auto_20210412_1822'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='serving_size',
            field=models.IntegerField(default=4, max_length=50),
            preserve_default=False,
        ),
    ]
