from django.apps import AppConfig


class AddRecipeConfig(AppConfig):
    name = 'recipe'

    def ready(self):
        import recipe.signals

        return super().ready()
