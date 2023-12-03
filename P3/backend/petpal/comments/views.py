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
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination

from applications.models import Application
from accounts.models import PetSeeker, PetShelter
from .models import ApplicationComment, ShelterComment
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import BasePermission

from notification.views import create_notification
from notification.serializers import NotificationSerializer
from notification.models import Notification


class CommentResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


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


class CanViewApplicationPermission(BasePermission):
    def has_permission(self, request, view):
        author = request.user
        application = get_object_or_404(Application, pk=view.kwargs["application"])
        try:
            if author.shelter != application.shelter:
                return False
        except ObjectDoesNotExist:
            if author != application.applicant:
                return False
        return True


# Create your views here.
class ShelterCommentListCreateView(ListCreateAPIView):
    """
    Comments from users on a given shelter.

    - A GET request returns all comments and replies to those comments for
    the given shelter.

    - A POST request adds a new comment to the shelter if the
    current user is logged in, and is not the shelter.
    """

    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes_per_method = {"GET": []}

    pagination_class = CommentResultsSetPagination

    def perform_create(self, serializer):
        author = self.request.user
        shelter = get_object_or_404(PetShelter, pk=self.kwargs["shelter"])
        try:
            if author.shelter == shelter:
                raise PermissionDenied
        except ObjectDoesNotExist:
            pass
        comment = serializer.save(author=author, shelter=shelter)

        create_notification(
            NotificationSerializer(
                data={
                    "message": f"{author.username} left a {comment.rating} star review",
                    "notification_type": Notification.NotificationTypes.REVIEW_COMMENT,
                    "was_read": False,
                    "notification_type_id": comment.id,
                }
            ),
            shelter.user,
        )

    def get_queryset(self):
        return (
            ShelterComment.objects.all()
            .filter(shelter=self.kwargs["shelter"])
            .order_by("-created_at")
        )


class ApplicationCommentListCreateView(ListCreateAPIView):
    """Comments from users on a given application.

    - A GET request returns all comments on an application

    - A POST request adds a new comment to the list of comments on the given application

    Requests are only permitted if the current user is the shelter receiving the application or the current
    user is the applicant.

    """

    serializer_class = ApplicationCommentSerializer
    permission_classes = [IsAuthenticated, CanViewApplicationPermission]
    pagination_class = CommentResultsSetPagination

    def perform_create(self, serializer):
        author = self.request.user
        application = get_object_or_404(Application, pk=self.kwargs["application"])
        application.last_update_time = datetime.now()
        application.save()
        serializer.save(author=author, application=application)

    def get_queryset(self):
        try:
            return (
                ApplicationComment.objects.all()
                .filter(
                    application__shelter=self.request.user.shelter,
                    application=self.kwargs["application"],
                )
                .order_by("-created_at")
            )
        except ObjectDoesNotExist:
            return (
                ApplicationComment.objects.all()
                .filter(
                    application=self.kwargs["application"],
                    application__applicant=self.request.user,
                )
                .order_by("-created_at")
            )


class ReplyCreateView(CreateAPIView):
    """Replies to a given comment

    - A POST request adds a new reply to a given shelter comment.

    Any logged in user can reply to a comment.
    """

    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        author = self.request.user
        parent = get_object_or_404(ShelterComment, pk=self.kwargs["parent"])
        reply = serializer.save(author=author, parent=parent)

        if parent.author.id != author.id:
            create_notification(
                NotificationSerializer(
                    data={
                        "message": f"{author.username} left a reply on one of your reviews",
                        "notification_type": Notification.NotificationTypes.REVIEW_REPLY,
                        "was_read": False,
                        "notification_type_id": reply.id,
                    }
                ),
                parent.author,
            )
