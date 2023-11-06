# Create your views here.

from typing import Any
from django.http import HttpRequest, HttpResponse
from django.views.generic.edit import CreateView, UpdateView
from .models import PetListing, PetListingImage
from .serializers import PetListingSerializer
from rest_framework.generics import ListCreateAPIView, CreateAPIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


class PetListingCreateView(CreateAPIView):
    serializer_class = PetListingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # TODO: Change this to shelter
        owner = self.request.user
        pet_images = serializer.validated_data.pop("images", tuple())

        pet_listing = PetListing.objects.create(
            **serializer.validated_data, owner=owner
        )

        for image_data in pet_images:
            PetListingImage.objects.create(**image_data, pet_listing=pet_listing)
