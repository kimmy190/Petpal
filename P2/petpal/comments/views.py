from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from .models import ApplicationComment, ShelterComment, Comment
from .serializers import ShelterCommentSerializer



class CommentResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50

# Create your views here.
class ShelterCommentCreateView(CreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        # TODO: Change this to shelter
        author = self.request.user

        shelter = get_object_or_404(User, pk=self.kwargs["shelter"])

        comment = ShelterComment.objects.create(
            **serializer.validated_data, author=author, shelter=shelter,
        )

class ApplicationCommentCreateView(CreateAPIView):
    # serializer_class = ApplicationCommentSerializer
    permission_classes = [IsAuthenticated]

    # def perform_create(self, serializer):
    #     # TODO: Change this to shelter
    #     author = self.request.user
    #     application = get_object_or_404(Application, pk=self.kwargs['pk'])
    #     if author != application.applicant and author != application.shelter:
    #         raise PermissionDenied

    #     comment = Comment.objects.create(
    #         **serializer.validated_data, author=author,
    #     )

    #     self.response_data = ShelterCommentSerializer(comment).data


class ShelterCommentListView(ListAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommentResultsSetPagination

    def get_queryset(self):
        return ShelterComment.objects.all().filter(shelter=self.kwargs["shelter"]).order_by("-created_at")
