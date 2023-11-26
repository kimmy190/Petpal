# from django.shortcuts import render
from django.urls import path
from .views import PetSeekerCreate, PetSeekerDetail, PetShelterListCreate, PetShelterDetail, PetShelterImageListCreate, PetShelterImageDetail

app_name = "accounts"
urlpatterns = [
    path('seeker/', PetSeekerCreate.as_view(), name='seeker-create'),
    path('seeker/<int:pk>/', PetSeekerDetail.as_view(), name='seeker-detail'),
    path('shelter/', PetShelterListCreate.as_view(), name='shelter-create'), 
    path('shelter/<int:pk>/', PetShelterDetail.as_view(), name='shelter-detail'),
    # endpoint for shelter images 
    path('shelter/<int:pk>/image/', PetShelterImageListCreate.as_view(), name='shelter-image'),
    path('shelter/<int:pk>/image/<int:img_id>/', PetShelterImageDetail.as_view(), name='shelter-image-detail'),

]
