# Create your views here.

from typing import Any
from django.http import HttpRequest, HttpResponse
from django.views.generic.edit import CreateView, UpdateView
from .models import PetListing, PetListingImage
from .serializers import PetListingSerializer, PetListingImageSerializer
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView,
)
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


# Taken from https://b0uh.github.io/drf-viewset-permission-policy-per-method.html
class PermissionPolicyMixin:
    def check_permissions(self, request):
        try:
            # This line is heavily inspired from `APIView.dispatch`.
            # It returns the method associated with an endpoint.
            handler = getattr(self, request.method.lower())
        except AttributeError:
            handler = None

        if (
            handler
            and self.permission_classes_per_method
            and handler.__name__.upper() in self.permission_classes_per_method
        ):
            self.permission_classes = self.permission_classes_per_method.get(
                handler.__name__.upper()
            )
        super().check_permissions(request)


class PetListingCreateView(PermissionPolicyMixin, ListCreateAPIView):
    serializer_class = PetListingSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_per_method = {"GET": []}
    queryset = PetListing.objects.all()

    def perform_create(self, serializer):
        # TODO: Change this to shelter
        owner = self.request.user

        # TODO: get location from shelter
        location = "Location"

        pet_images = serializer.validated_data.pop("images", tuple())

        pet_listing = PetListing.objects.create(
            **serializer.validated_data, owner=owner, location=location
        )

        for image in pet_images:
            PetListingImage.objects.create(image=image, pet_listing=pet_listing)

        self.response_data = serializer.data
        self.response_data["id"] = pet_listing.id

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            self.response_data, status=status.HTTP_201_CREATED, headers=headers
        )


class PetListingView(PermissionPolicyMixin, RetrieveUpdateDestroyAPIView):
    serializer_class = PetListingSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_per_method = {"GET": []}

    def get_queryset(self):
        if self.request.method == "GET":
            return PetListing.objects.all()
        return PetListing.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        pet_images = serializer.validated_data.pop("images", tuple())
        pet_listing = serializer.save()

        # TODO: Right now, we delete images.
        # This is fine if we're doing an update,
        # but if we're doing a patch, we should maybe only
        #  update what's changed
        # Possibly look at https://stackoverflow.com/questions/53236669/django-rest-framework-list-update-api-view
        pet_listing.petlistingimage_set.all().delete()

        for image in pet_images:
            PetListingImage.objects.create(image=image, pet_listing=pet_listing)

    def perform_destroy(self, instance):
        instance.delete()


class PetListingImageCreateView(PermissionPolicyMixin, ListCreateAPIView):
    serializer_class = PetListingImageSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_per_method = {"GET": []}

    def get_queryset(self):
        get_object_or_404(PetListing, pk=self.kwargs["pet_listing"])
        return PetListingImage.objects.filter(pet_listing=self.kwargs["pet_listing"])

    def perform_create(self, serializer):
        # TODO: Change this to shelter
        owner = self.request.user
        pet_listing = get_object_or_404(
            PetListing, owner=owner, pk=self.kwargs["pet_listing"]
        )

        pet_listing_image = PetListingImage.objects.create(
            **serializer.validated_data, pet_listing=pet_listing
        )
        self.response_data = serializer.data
        self.response_data["id"] = pet_listing_image.id
        self.response_data["image"] = pet_listing_image.image.url

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            self.response_data, status=status.HTTP_201_CREATED, headers=headers
        )


class PetListingImageView(PermissionPolicyMixin, RetrieveDestroyAPIView):
    serializer_class = PetListingImageSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_per_method = {"GET": []}

    def get_queryset(self):
        if self.request.method == "GET":
            return PetListingImage.objects.all()
        return PetListingImage.objects.filter(pet_listing=self.kwargs["pet_listing"])

    def get_object(self):
        return get_object_or_404(
            PetListingImage,
            pet_listing=self.kwargs["pet_listing"],
            pk=self.kwargs["pk"],
        )

    def perform_destroy(self, instance):
        instance.delete()
