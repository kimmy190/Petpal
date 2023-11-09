from datetime import datetime
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from rest_framework.generics import (
    ListCreateAPIView,
    # CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from applications.models import Application
from accounts.models import PetSeeker, Shelter
from .models import ApplicationComment, ShelterComment, Comment
from .serializers import *



class CommentResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50

# Create your views here.
class ShelterCommentListCreateView(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        # TODO: Change this to shelter
        author = self.request.user

        shelter = get_object_or_404(Shelter, pk=self.kwargs["shelter"])

        serializer.save(author=author, shelter=shelter)

    def get_queryset(self):
        return ShelterComment.objects.all().filter(shelter=self.kwargs["shelter"]).order_by("-created_at")

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

        comment = Comment.objects.create(
            **serializer.validated_data, author=author,
        )

        self.response_data = ShelterCommentSerializer(comment).data



    def get_queryset(self):
        if self.request.user.shelter:
            return ApplicationComment.objects.all().filter(shelter=self.request.user.shelter).order_by("-created_at")
        else:
            return ApplicationComment.objects.all().filter(shelter=self.request.user).order_by("-created_at")


# class ApplicationCommentListView(ListAPIView):
#     serializer_class = CommentSerializer
#     permission_classes = [IsAuthenticated]

# class ShelterCommentListView(ListAPIView):
#     serializer_class = ShelterCommentSerializer
#     permission_classes = [IsAuthenticated]
#     pagination_class = CommentResultsSetPagination

#     def get_queryset(self):
#         return ShelterComment.objects.all().filter(shelter=self.kwargs["shelter"]).order_by("-created_at")
