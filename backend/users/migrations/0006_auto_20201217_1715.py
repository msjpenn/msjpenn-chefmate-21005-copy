# Generated by Django 2.2.17 on 2020-12-17 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_categorymaster_measurementmaster_usercategory_userfollowing_usermeasurement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdemographics',
            name='mobile',
            field=models.CharField(default='', max_length=20),
        ),
    ]
