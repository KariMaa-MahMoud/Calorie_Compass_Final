from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from meals_tracker.models import Meals
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.views.generic import DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from meals_tracker.forms import MealForm
import requests
from django.http import JsonResponse
from django.conf import settings
from meals_tracker.utils import fetch_food_items
from django.template.defaulttags import register
from django.core.exceptions import ValidationError
from django.contrib import messages


@register.filter(name='split')
def split(value, key):
    """
        Returns the value turned into a list.
    """
    return value.split(key)

# Create your views here.
def home(request):
    return render(request, 'meals_tracker/home.html')


def about(request):
    return render(request, 'meals_tracker/about.html')


def calorie_calc(request):
    return render(request, 'meals_tracker/calorie_calc.html')


class MealView(LoginRequiredMixin, View):
    template_name = 'meals_tracker/meal-tracking.html'


    def get(self, request, *args, **kwargs):
        form = MealForm()
        return self.form_invalid(request, form)


    def post(self, request, *args, **kwargs):
        if request.POST.get('_method') == 'delete':
            return self.delete(request, *args, **kwargs)

        form = MealForm(request.POST)
        if form.is_valid():
            new_meal = form.save(commit=False)
            new_meal.user = request.user
            food_items = new_meal.food_items.replace(" ", "")

            for item in food_items.split(','):
                response = fetch_food_items(item)
                if response:
                    for i in response:
                        if i['name'] in item:
                            new_meal.calories += i['calories']
                else:
                    form.add_error('food_items', "Please enter valid food with comma-separated values")
                    return self.form_invalid(request, form)

            new_meal.food_items = food_items
            new_meal.save()
            return redirect('meals_tracker:meals_list')

        return self.form_invalid(request, form)


    def form_invalid(self, request, form):
        meals = Meals.objects.filter(user=request.user)
        selected_meal = None
        slug = request.GET.get('slug')

        if slug:
            selected_meal = get_object_or_404(Meals, slug=slug, user=request.user)

        return render(request, self.template_name, {
            'meals': meals,
            'selected_meal': selected_meal,
            'form': form,
        })


    def delete(self, request, *args, **kwargs):
        slug = request.POST.get('meal_slug')
        meal = get_object_or_404(Meals, slug=slug, user=request.user)
        meal.delete()
        messages.success(request, f'The {slug} has been deleted successfully !')
        return redirect('meals_tracker:meals_list')
