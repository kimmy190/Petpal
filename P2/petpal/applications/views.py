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

# permissions


class ApplicationCreateView(CreateAPIView):
    serializer_class = ApplicationSerializer
    # permission_classes = [IsAuthenticated]
    # permission_classes_per_method = {"POST": []}

    def create(self, request, *args, **kwargs):
        # if not request.user.is_authenticated:
        #     return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
        owner = self.request.user
        pet_listing = get_object_or_404(
            PetListing, owner=owner, pk=self.kwargs["pet_listing"]
        )
        if pet_listing.Statuses == "Available":
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data)
        else:
            return Response({"error": "The selected pet is not available"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# need to check if only specific shelter application + add permissions + update last_update_time w comment


class ApplicationListView(ListAPIView):
    serializer_class = ApplicationSerializer
    # permission_classes_per_method = {"GET: []"}
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['status']
    ordering_fields = ['creation_time', 'last_update_time']

    def get_queryset(self):
        queryset = Application.objects.all()
        return queryset

# permissions


class ApplicationUpdateView(RetrieveUpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    # permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        application = self.get_object()
        owner = request.user

        # if shelter, can update to Accepted or Rejected
        if owner.is_shelter:
            new_status = request.data.get('status', '').capitalize()
            if new_status != "ACCEPTED" or new_status != "REJECTED":
                return Response({"error": "Choose between Accepted or Rejected"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                application.status = new_status
                application.save()

        else:
            new_status = request.data.get('status', '').capitalize()
            if new_status != "WITHDRAW":
                return Response({"error": "Can only withdraw application"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                application.status = new_status
                application.save()

        # Return a success response
        return Response(
            self.get_serializer(application).data,
            status=status.HTTP_200_OK
        )
