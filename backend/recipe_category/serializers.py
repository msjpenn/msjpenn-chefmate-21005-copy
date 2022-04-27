from rest_framework.serializers import ModelSerializer


from .models import RecipeCategory


class RecipeCategorySerializer(ModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = "__all__"