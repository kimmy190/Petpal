from datetime import datetime
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from rest_framework.generics import (
    ListCreateAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView,
)
from rest_framework.permissions import (IsAuthenticated, IsAuthenticatedOrReadOnly)
from rest_framework.pagination import PageNumberPagination

from applications.models import Application
from accounts.models import PetSeeker, PetShelter
from .models import ApplicationComment, ShelterComment
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist

class CommentResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50

# Create your views here.
class ShelterCommentListCreateView(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CommentResultsSetPagination
    def perform_create(self, serializer):
        author = self.request.user
        shelter = get_object_or_404(PetShelter, pk=self.kwargs["shelter"])
        try:
            if author.shelter == shelter:
                raise PermissionDenied
        except ObjectDoesNotExist:
            pass
        serializer.save(author=author, shelter=shelter)

    def get_queryset(self):
        return ShelterComment.objects.all().filter(shelter=self.kwargs["shelter"]).order_by("-created_at")

class ApplicationCommentListCreateView(ListCreateAPIView):
    serializer_class = ApplicationCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommentResultsSetPagination

    def perform_create(self, serializer):
        author = self.request.user
        application = get_object_or_404(Application, pk=self.kwargs['application'])
        try:
            if author.shelter != application.shelter:
                raise PermissionDenied
        except ObjectDoesNotExist:
            if author != application.applicant:
                raise PermissionDenied

        application.last_update_time = datetime.now()
        application.save()
        serializer.save(author=author, application=application)

    def get_queryset(self):
        try:
            return ApplicationComment.objects.all().filter(application__shelter=self.request.user.shelter,
                                                           application=self.kwargs['application']).order_by("-created_at")
        except ObjectDoesNotExist:
            return ApplicationComment.objects.all().filter(application=self.kwargs['application'],
                                                           application__applicant=self.request.user).order_by("-created_at")

class ReplyCreateView(CreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        author = self.request.user
        parent = get_object_or_404(ShelterComment, pk=self.kwargs["parent"])
        serializer.save(author=author, parent=parent)
