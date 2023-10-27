from django.shortcuts import render
from django.urls import path
from .views import PetListingCreateView

app_name = "pet_listing"
urlpatterns = [path("", PetListingCreateView.as_view(), name="pet_listing")]
