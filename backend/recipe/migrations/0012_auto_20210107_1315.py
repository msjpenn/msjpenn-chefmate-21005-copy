# Generated by Django 2.2.17 on 2021-01-07 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0011_auto_20210107_1310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='difficulty',
            field=models.CharField(blank=True, choices=[('easy', 'easy'), ('medium', 'medium'), ('hard', 'hard')], max_length=50, null=True),
        ),
    ]
