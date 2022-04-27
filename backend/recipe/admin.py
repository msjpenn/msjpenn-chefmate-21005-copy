from django.contrib import admin

from .models import (
    Recipe,
    RecipeAITask,
    RecipeSection,
    Ingredient,
    RecipeLikes,
    RecipeImages,
    RecipeInstruction,
    RecipeAIImage,
    RecipeAIWebsiteURL,
    RecipeAIAudio,
)

admin.site.register(Recipe)
admin.site.register(RecipeSection)
admin.site.register(Ingredient)
admin.site.register(RecipeLikes)
admin.site.register(RecipeImages)
admin.site.register(RecipeInstruction)


@admin.register(RecipeAITask)
class RecipeAITaskAdmin(admin.ModelAdmin):
    list_display = ["recipe"]
    readonly_fields = ["created", "modified"]

@admin.register(RecipeAIImage)
class RecipeAIImageAdmin(admin.ModelAdmin):
    list_display = ["recipe_ai_task"]
    readonly_fields = ["created", "modified"]


@admin.register(RecipeAIWebsiteURL)
class RecipeAIWebisteURLAdmin(admin.ModelAdmin):
    list_display = ["recipe_ai_task"]
    readonly_fields = ["created", "modified"]


@admin.register(RecipeAIAudio)
class RecipeAIAudioAdmin(admin.ModelAdmin):
    list_display = ["recipe_ai_task"]
    readonly_fields = ["created", "modified"]
