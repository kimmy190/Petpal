from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Application
from .serializers import ApplicationSerializer
from pet_listing.models import PetListing
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import PermissionDenied

# Taken from https://stackoverflow.com/questions/31785966/django-rest-framework-turn-on-pagination-on-a-viewset-like-modelviewset-pagina


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10


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


class ApplicationCreateView(CreateAPIView):
    """
    Create a new application for an Available pet listing to adopt a pet.

    - A POST request creates the application.
    - Application cannot be deleted unless the pet listing is deleted.
    - Only Users can create applications (Shelters cannot create applications).
    """
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            if request.user.shelter:
                return Response({"error": "Shelters cannot create application"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            pet_listing = get_object_or_404(
                PetListing, id=self.kwargs["pet_listing"]
            )

            # User can only create one application for a pet listing
            existing_application = Application.objects.filter(
                applicant=request.user,
                pet_listing=pet_listing
            ).first()

            if existing_application:
                return Response({"error": "You already have an application for this pet"}, status=status.HTTP_400_BAD_REQUEST)

            if pet_listing.status == "Available":
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                return Response(serializer.data)
            else:
                return Response({"error": "The selected pet is not available"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        applicant = self.request.user
        pet_listing = get_object_or_404(
            PetListing, id=self.kwargs["pet_listing"]
        )
        serializer.validated_data['applicant'] = applicant
        serializer.validated_data['pet_listing'] = pet_listing
        serializer.validated_data['shelter'] = pet_listing.shelter
        serializer.validated_data['status'] = "Pending"
        serializer.save()


class ApplicationListView(ListAPIView):
    """
    Full list of applications for either User or Shelter.

    - A GET request returns all applications with the given filter and order.
    By default, there are no filters. You can filter the listings by status (Accepted, Rejected, Pending, Withdrawn).
    You can order the applications by creation_time or last_update_time.

    - For Shelters, it will display a list of all incoming applications from users.

    - For Users, it will display a list of all outgoing applications to shelters.
    """
    serializer_class = ApplicationSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['status']
    ordering_fields = ['creation_time', 'last_update_time']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        owner = self.request.user
        try:
            if owner.shelter is not None:
                queryset = Application.objects.filter(shelter=owner.shelter)
        except:
            queryset = Application.objects.filter(applicant=owner)
        return queryset


class ApplicationUpdateView(RetrieveUpdateAPIView):
    """
    Update the status of existing application.

    - A GET request gets the existing application information.
    A PUT/PATCH request updates the status (can only update the status) of an application.
    By default, applications are created with status "Pending."

    - Users can update their appilcation status to "Withdrawn."

    - Shelters can update their application status to either "Accepted" or "Rejected."
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        application = self.get_object()
        applicant = self.request.user
        # if shelter, can update to Accepted or Rejected
        try:
            if applicant.shelter is not None:
                # check permission
                if application.shelter == applicant.shelter:
                    new_status = request.data.get('status', '')
                    if new_status != "Accepted" and new_status != "Rejected":
                        return Response({"error": "Choose between Accepted or Rejected"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        application.status = new_status
                        application.save()
                else:
                    return Response({"error": "You do not have access to this application"}, status=status.HTTP_400_BAD_REQUEST)

        # if applicant, can update to Withdraw
        except:
            # check permission
            if application.applicant == self.request.user:
                new_status = request.data.get('status', '')
                if new_status != "Withdrawn":
                    return Response({"error": "Can only withdraw application"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    application.status = new_status
                    application.save()
            else:
                return Response({"error": "You do not have access to this application"}, status=status.HTTP_400_BAD_REQUEST)

        # Success
        return Response(
            self.get_serializer(application).data,
            status=status.HTTP_200_OK
        )
