# Create your views here.
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveDestroyAPIView,
)
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import PermissionDenied
from django.urls import reverse

from comments.models import ShelterComment, ApplicationComment, Reply
from pet_listing.models import PetListing
from applications.models import Application


class NotificationPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


def create_notification(serializer, user):
    if not serializer.is_valid():
        return
    notification_type = serializer.validated_data.get("notification_type")
    notification_type_id = serializer.validated_data.get(
        "notification_type_id")

    type_to_object_type = {
        Notification.NotificationTypes.APPLICATION_COMMENT: ApplicationComment,
        Notification.NotificationTypes.PET_LISTING: PetListing,
        Notification.NotificationTypes.REVIEW_COMMENT: ShelterComment,
        Notification.NotificationTypes.REVIEW_REPLY: Reply,
        Notification.NotificationTypes.APPLICATION: Application,
    }
    # For comments endpoint, the notification_type_id will be the id of the comment.
    # However, we want to extract the id of the shelter/application associated with that comment
    link = ""
    match notification_type:
        case Notification.NotificationTypes.APPLICATION_COMMENT:
            link = reverse("applications:get", kwargs={
                           "pk": notification_type_id})
        case Notification.NotificationTypes.PET_LISTING:
            link = reverse("pet_listing:get", kwargs={
                           "pk": notification_type_id})

        case Notification.NotificationTypes.REVIEW_COMMENT:
            link = f"/shelter/{user.shelter.id}"
        case Notification.NotificationTypes.REVIEW_REPLY:
            shelter_id = get_object_or_404(
                ShelterComment,
                pk=get_object_or_404(Reply, pk=notification_type_id).parent.pk,
            ).shelter.pk
            link = f"/shelter/{shelter_id}"

        case Notification.NotificationTypes.APPLICATION:
            link = reverse("applications:get", kwargs={
                           "pk": notification_type_id})
    # Make sure the object type exists
    get_object_or_404(
        type_to_object_type[notification_type], pk=notification_type_id)
    return Notification.objects.create(
        **serializer.validated_data, seeker=user, link=link
    )


class NotificaitonListCreate(ListCreateAPIView):
    """
    Notifications for users.

    - A GET request returns a paginated list of all notifications for the current user.
    These notifications are ordered by their creation date.
    It is possible to filter by whether the notification was read by setting the "was_read" query parameter to "True" or "False".

    - A POST request adds a new notification for the current user.
      You must specify the type of notification (notification_type) and the object id (notification_type_id) of the model indicated by notification_type
      The link for the notification is automatically generated based off these parameters.
    """

    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination

    def get_queryset(self):
        notifcations = Notification.objects.filter(seeker=self.request.user).order_by(
            "creation_date"
        )

        filter = {}
        if "was_read" in self.request.GET and self.request.GET["was_read"] in [
            "True",
            "False",
        ]:
            filter["was_read"] = self.request.GET["was_read"]

        return notifcations.filter(**filter)

    def perform_create(self, serializer):
        create_notification(serializer, self.request.user)


class NotificationRUD(RetrieveUpdateDestroyAPIView):
    """
    Interact with a specific notification

    - A GET request returns a specific notification available to the user.

    - A PATCH/PUT request modifies the notification. Only the was_read field can be updated.

    - A DELETE request deletes the notificaiton.
    """

    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(seeker=self.request.user)
