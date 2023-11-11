from django.shortcuts import render
from django.urls import path
from .views import (
    PetListingCreateView,
    PetListingView,
    PetListingImageView,
    PetListingImageCreateView,
)

app_name = "pet_listing"
urlpatterns = [
    path("", PetListingCreateView.as_view()),
    path("<int:pk>", PetListingView.as_view(), name="get"),
    path(
        "<int:pet_listing>/image/",
        PetListingImageCreateView.as_view(),
    ),
    path(
        "<int:pet_listing>/image/<int:pk>",
        PetListingImageView.as_view(),
    ),
]
