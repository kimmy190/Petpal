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
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 1000


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
    # need to check if pet available
    serializer_class = ApplicationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()


class ApplicationListView(ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes_per_method = {"GET: []"}
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['status']
    ordering_fields = ['creation_time', 'last_update_time']

    def get_queryset(self):
        queryset = Application.objects.all()
        return queryset


class ApplicationUpdateView(RetrieveUpdateAPIView):
    serializer_class = ApplicationSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(owner_name=self.request.user)

    def perform_update(self, serializer):
        application = serializer.instance

        # Shelter can update the status from pending to accepted or denied
        if application.status == "PENDING" and application.pet_listing.owner == self.request.user:
            serializer.save()
        # Pet seeker can update the status from pending or accepted to withdrawn
        elif application.status in ["Pending", "Accepted"] and application.owner_name == self.request.user:
            serializer.save()
        else:
            return Response("You don't have permission to update this application status.", status=status.HTTP_403_FORBIDDEN)
