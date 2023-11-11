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



class CommentResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50

# Create your views here.
class ShelterCommentListCreateView(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        # TODO: Change this to shelter
        serializer.is_valid(raise_exception=True)
        author = self.request.user

        shelter = get_object_or_404(PetShelter, pk=self.kwargs["shelter"])
        parent = self.request.query_params.get("parent")
        if parent is not None:
            parent = get_object_or_404(ShelterComment, pk=parent)
        if parent is None and author.shelter == shelter:
            raise PermissionDenied
        serializer.save(author=author, shelter=shelter, parent=parent)

    def get_queryset(self):
        return ShelterComment.objects.select_related("reply").all().filter(shelter=self.kwargs["shelter"]).order_by("-created_at")

class ApplicationCommentListCreateView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommentResultsSetPagination

    def perform_create(self, serializer):
        # TODO: Change this to shelter
        author = self.request.user
        application = get_object_or_404(Application, pk=self.kwargs['application'])
        if author != application.owner and author.shelter != application.shelter:
            raise PermissionDenied
        application.last_update_time = datetime.now()
        application.save()
        # ApplicationComment.objects.create(
        #     **serializer.validated_data, author=author,
        # )

        serializer.save(author=author)



    def get_queryset(self):
        if self.request.user.shelter:
            return ApplicationComment.objects.all().filter(shelter=self.request.user.shelter).order_by("-created_at")
        else:
            return ApplicationComment.objects.all().filter(shelter=self.request.user).order_by("-created_at")



class ReplyCreateView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        author = self.request.user
        parent = get_object_or_404(ShelterComment, pk=self.kwargs["parent"])
        serializer.save(author=author, parent=parent)
