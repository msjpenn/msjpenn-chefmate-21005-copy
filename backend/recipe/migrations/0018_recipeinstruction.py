# Generated by Django 2.2.19 on 2021-03-10 14:15

import core.utils
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0017_recipe_is_draft'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecipeInstruction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=core.utils.generate_recipe_file_name)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_instruction', to='recipe.Recipe')),
            ],
            options={
                'verbose_name': 'Recipe Instruction',
                'verbose_name_plural': 'Recipe Instructions',
            },
        ),
    ]
