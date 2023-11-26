from django.shortcuts import render, get_object_or_404
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    SeekerSerializer,
    ShelterSerializer,
    ShelterImageSerializer,
    ShelterInfoSerializer,
)
from .models import PetSeeker, PetShelter, ShelterImage
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10


# Create your views here.
class CanViewSeekerProfile(BasePermission):
    def has_permission(self, request, view):
        # if request.authenticators and TokenAuthentication in request.authenticators:
        # Token-based authentication present
        if request.user and request.user.is_authenticated:
            if hasattr(request.user, "shelter"):  # Check if the user is a PetShelter
                shelter = request.user.shelter
                # should be shelter , else false
                if shelter.application_set.filter(
                    applicant_id=view.kwargs["pk"]
                ).exists():
                    # if shelter.application_set.filter(shelter=shelter).exists(): #acceess application set
                    if request.method in permissions.SAFE_METHODS:
                        # check if they are active
                        application = shelter.application_set.get(
                            applicant_id=view.kwargs["pk"]
                        )
                        if application.status == "Pending":
                            return True
                        else:
                            # application not active
                            return False
                    else:
                        # not allowed to update / delete
                        return False
            else:
                # is a pet seeker
                return int(request.user.id) == int(view.kwargs["pk"])
        return False


class PetSeekerCreate(CreateAPIView):
    """
    A view for creating a new pet seeker.

    - A POST request with required data creates a pet seeker.
    It operates with no authentication requirements.
    """

    permission_classes = [AllowAny]
    serializer_class = SeekerSerializer


class PetSeekerDetail(RetrieveUpdateDestroyAPIView):
    """
    A view for retrieving, updating, and deleting a specific pet seeker's details.

    Seeker can only view their own profile and shelters can only view pet seeker's profile
    if they have an active application(application status=pending) with the shelter.
    Only pet seeker is allowed to update/delete their own profile.

    - A GET request retrieves the detail of pet seeker.
    - A PATCH/PUT request with modified data updates the per seeker information.
    - A DELETE request deletes the pet seeker.
    """

    permission_classes = [CanViewSeekerProfile]
    serializer_class = SeekerSerializer

    def get_object(self):
        """
        Get the specific pet seeker object based on the provided ID.
        """
        return get_object_or_404(PetSeeker, id=self.kwargs["pk"])


class PetShelterListCreate(ListCreateAPIView):
    """
    A view for creating a new pet shelter and listing all the shelters.

    - A POST request with required data creates a pet shelter.
    It operates with no authentication requirements.

    - A GET request retrieves the list of all pet shelters.
    """

    permission_classes = [AllowAny]
    serializer_class = ShelterSerializer

    def get_queryset(self):
        # Get all existing PetShelter instances
        return PetSeeker.objects.filter(shelter__isnull=False)


class IsShelterOwner(BasePermission):
    def has_permission(self, request, view):
        # If it's a GET request, allow any user to view the shelter.
        if request.method in permissions.SAFE_METHODS:
            return True

        # If it's an unsafe method (PUT, PATCH, DELETE)
        if hasattr(request.user, "shelter"):  # check if user is shelter
            # return obj.shelter == request.user
            return request.user.id == view.kwargs["pk"]
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


class PetShelterDetail(PermissionPolicyMixin, RetrieveUpdateDestroyAPIView):
    """
    A view for retrieving, updating, and deleting a specific pet shelter's details.

    Any user (shelter or seeker) can see the profile of a shelter.
    Only pet shelter is allowed to update/delete their own profile.

    - A GET request retrieves the detail of pet shelter.
    - A PATCH/PUT request with modified data updates the pet shelter information.
    - A DELETE request deletes the pet shelter.
    """

    permission_classes = [IsAuthenticated, IsShelterOwner]
    permission_classes_per_method = {"GET": []}
    serializer_class = ShelterSerializer

    def get_object(self):
        return get_object_or_404(PetShelter, id=self.kwargs["pk"]).user
