from django.shortcuts import render, get_object_or_404
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
    RetrieveDestroyAPIView,
    RetrieveAPIView,
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
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10


# class RegistrationAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         # Your registration logic here...

#         # Assuming you have a `user` object after successful registration
#         user = ...

#         # Manually create a JWT token
#         refresh = RefreshToken.for_user(user)
#         access_token = str(refresh.access_token)

#         # Return the token in the response
#         return Response({'access': access_token}, status=status.HTTP_201_CREATED)


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


class PetSeekerDetail(PermissionPolicyMixin, RetrieveUpdateDestroyAPIView):
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
    permission_classes_per_method = {"GET": []}
    serializer_class = SeekerSerializer

    def perform_update(self, serializer):
        seeker = serializer.save()
        seeker.set_password(seeker.password)
        seeker.save()

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
            return request.user.shelter.id == view.kwargs["pk"]
        return False


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

    # def perform_update(self, serializer):
    #     # Update the fields of the PetShelter model
    #     uuser = get_object_or_404(PetShelter, id=self.kwargs["pk"]).user
    #     shelter = uuser.shelter
    #     uuser.username = serializer.validated_data.get("username", uuser.username)
    #     # uuser.email = serializer.validated_data.get("organization_name", uuser.username)
    #     uuser.shelter.organization_name = serializer.validated_data.get("organization_name", shelter.organization_name)
    #     uuser.shelter.logo_image = serializer.validated_data.get("logo_image", shelter.logo_image)
    #     uuser.shelter.phone_number = serializer.validated_data.get("phone_number", shelter.phone_number)
    #     uuser.shelter.mission_statement = serializer.validated_data.get("mission_statement", shelter.mission_statement)
    #     uuser.shelter.country = serializer.validated_data.get("country", shelter.country)
    #     uuser.shelter.address1 = serializer.validated_data.get("address1", shelter.address1)
    #     uuser.shelter.address2 = serializer.validated_data.get("address2", shelter.address2)
    #     uuser.shelter.city = serializer.validated_data.get("city", shelter.city)
    #     uuser.shelter.state = serializer.validated_data.get("state", shelter.state)
    #     uuser.shelter.zip = serializer.validated_data.get("zip", shelter.zip)

    #     # Save the updated PetShelter instance
    #     shelter.save()


# retrieve, and update(only be done by user) the image for shelter
class PetShelterImageListCreate(PermissionPolicyMixin, ListCreateAPIView):
    """
    A view for listing all the images.

    - A GET request retrieves the list pet shelter images for a specific pet shelter
    - A POST request adds a new image for a specific pet shelter
    """

    permission_classes = [IsAuthenticated, IsShelterOwner]
    permission_classes_per_method = {"GET": []}

    serializer_class = ShelterImageSerializer
    queryset = ShelterImage.objects.all()

    def get_queryset(self):
        return ShelterImage.objects.filter(shelter=self.kwargs["pk"])

    def perform_create(self, serializer):
        # Assuming the shelter is associated with the logged-in user
        serializer.save(shelter=self.request.user.shelter)


class PetShelterImageDetail(RetrieveDestroyAPIView):
    """
    A view for updating, retieving, updating, deleting a specific pet shelter's image

    - A GET request returns the specific image
    - A DELETE request deletes the specific image
    """

    permission_classes = [IsAuthenticated, IsShelterOwner]
    serializer_class = ShelterImageSerializer
    queryset = ShelterImage.objects.all()

    def get_queryset(self):
        return ShelterImage.objects.filter(shelter=self.kwargs["pk"])

    def get_object(self):
        shelter_id = self.kwargs["pk"]
        image_id = self.kwargs["img_id"]
        return get_object_or_404(ShelterImage, shelter__id=shelter_id, id=image_id)
        # return ShelterImage.objects.get(shelter__id=shelter_id, id=image_id)

    def perform_destroy(self, instance):
        # delete the actual image file from storage
        instance.image.delete()  # Assuming 'image' is the ImageField in ShelterImage model
        instance.delete()


# get user based on the token value
class GetUser(RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    # serializer_class = SeekerSerializer

    # def get_serializer_class(self):
    #     # Check if the user has a column named 'shelter' and its value is True
    #     if getattr(self.request.user, 'shelter', False):
    #         return PetShelterSerializer
    #     else:
    #         return PetSeekerSerializer
    def get_serializer_class(self):
        # if hasattr(self.request.user, "shelter"):
        if self.request.user.first_name == "":
            return ShelterSerializer
        else:
            return SeekerSerializer

    def get(self, request):
        user = request.user
        instance = None
        # seeker_instance = get_object_or_404(PetSeeker, id=user.id)
        # if getattr(user, 'shelter', False):
        if hasattr(user, "shelter"):
            instance = get_object_or_404(PetShelter, user=user).user
        else:
            instance = get_object_or_404(PetSeeker, id=user.id)

        serializer = self.get_serializer(instance)

        return Response(serializer.data)
