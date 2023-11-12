# Create your views here.
from .models import PetListing, PetListingImage
from .serializers import PetListingSerializer, PetListingImageSerializer
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView,
)
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist


# Taken from https://stackoverflow.com/questions/31785966/django-rest-framework-turn-on-pagination-on-a-viewset-like-modelviewset-pagina
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 1000


class IsShelterPermission(IsAuthenticated):
    def has_permission(self, request, view):
        try:
            return super().has_permission(request, view) and request.user.shelter
        except ObjectDoesNotExist:
            return False


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
    permission_classes = [IsShelterPermission]
    permission_classes_per_method = {"GET": []}
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        order_by = self.request.GET.get("order_by", "id")
        use_id = True
        for field in PetListing._meta.get_fields():
            if field.name == order_by:
                use_id = False
                break
        if use_id:
            order_by = "id"

        filter = {}
        filter["status"] = self.request.GET.get("status", "Available")
        for filter_param in ["owner", "breed", "age", "size"]:
            if filter_param in self.request.GET:
                filter[filter_param] = self.request.GET[filter_param]

        return PetListing.objects.filter(**filter).order_by(order_by)

    def perform_create(self, serializer):
        shelter = self.request.user.shelter

        pet_images = serializer.validated_data.pop("images", tuple())

        pet_listing = PetListing.objects.create(
            **serializer.validated_data, shelter=shelter
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
    permission_classes = [IsShelterPermission]
    permission_classes_per_method = {"GET": []}

    def get_queryset(self):
        if self.request.method == "GET":
            return PetListing.objects.all()
        return PetListing.objects.filter(shelter=self.request.user.shelter)

    def perform_update(self, serializer):
        pet_images = serializer.validated_data.pop("images", tuple())
        pet_listing = serializer.save()

        if pet_images:
            pet_listing.petlistingimage_set.all().delete()
            for image in pet_images:
                PetListingImage.objects.create(image=image, pet_listing=pet_listing)

    def perform_destroy(self, instance):
        instance.delete()


class PetListingImageCreateView(PermissionPolicyMixin, ListCreateAPIView):
    serializer_class = PetListingImageSerializer
    permission_classes = [IsShelterPermission]
    permission_classes_per_method = {"GET": []}

    def get_queryset(self):
        get_object_or_404(PetListing, pk=self.kwargs["pet_listing"])
        return PetListingImage.objects.filter(pet_listing=self.kwargs["pet_listing"])

    def perform_create(self, serializer):
        shelter = self.request.user.shelter
        pet_listing = get_object_or_404(
            PetListing, shelter=shelter, pk=self.kwargs["pet_listing"]
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
    permission_classes = [IsShelterPermission]
    permission_classes_per_method = {"GET": []}
    queryset = PetListingImage.objects.all()

    def get_object(self):
        return get_object_or_404(
            PetListingImage,
            pet_listing=self.kwargs["pet_listing"],
            pk=self.kwargs["pk"],
        )

    def perform_destroy(self, instance):
        if instance.pet_listing.owner != self.request.user:
            raise PermissionDenied()
        instance.delete()
