from rest_framework.serializers import ModelSerializer


from recipe.models import Ingredient


class IngredientsSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"