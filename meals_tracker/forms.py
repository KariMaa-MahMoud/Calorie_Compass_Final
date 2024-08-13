from django import forms
from meals_tracker.models import Meals, Food
from meals_tracker.utils import fetch_food_items

class MealForm(forms.ModelForm):

    class Meta:
        model = Meals
        fields = ['name', 'food_items']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['food_items'].widget.attrs.update({'placeholder': ('Enter your food with comma-separated ...')})
