from rest_framework.serializers import ModelSerializer


from recipe.models import RecipeSection


class RecipeSectionsSerializer(ModelSerializer):
    class Meta:
        model = RecipeSection
        fields = "__all__"