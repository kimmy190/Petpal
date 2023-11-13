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


class NotificaitonListCreate(ListCreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination

    def get_queryset(self):
        notifcations = Notification.objects.filter(seeker=self.request.user).order_by(
            "creation_date"
        )

        filter = {}
        if "was_read" in self.request.GET:
            filter["was_read"] = self.request.GET.get("was_read", "")
        return notifcations.filter(**filter)

    def perform_create(self, serializer):
        seeker = self.request.user
        notification_type = serializer.validated_data.get("notification_type")
        notification_type_id = serializer.validated_data.get("notification_type_id")

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
                link = reverse(
                    "comments:get_application_list",
                    kwargs={
                        "application": get_object_or_404(
                            ApplicationComment, pk=notification_type_id
                        ).application.pk
                    },
                )
            case Notification.NotificationTypes.PET_LISTING:
                link = reverse("pet_listing:get", kwargs={"pk": notification_type_id})

            case Notification.NotificationTypes.REVIEW_COMMENT:
                link = reverse(
                    "comments:get_shelter_list",
                    kwargs={
                        "shelter": get_object_or_404(
                            ShelterComment, pk=notification_type_id
                        ).shelter.pk
                    },
                )
            case Notification.NotificationTypes.REVIEW_REPLY:
                link = reverse(
                    "comments:get_shelter_list",
                    kwargs={
                        "shelter": get_object_or_404(
                            ShelterComment,
                            pk=get_object_or_404(
                                Reply, pk=notification_type_id
                            ).parent.pk,
                        ).shelter.pk
                    },
                )

            case Notification.NotificationTypes.APPLICATION:
                link = reverse("applications:get", kwargs={"pk": notification_type_id})
        # Make sure the object type exists
        get_object_or_404(
            type_to_object_type[notification_type], pk=notification_type_id
        )
        Notification.objects.create(
            **serializer.validated_data, seeker=seeker, link=link
        )


class NotificationRUD(RetrieveUpdateDestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(seeker=self.request.user)
