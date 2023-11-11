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
        type_to_endpoint = {
            Notification.NotificationTypes.APPLICATION_MESSAGE: "comments",
            Notification.NotificationTypes.STATUS_UPDATE: "applications/application",
            Notification.NotificationTypes.NEW_PET_LISTING: reverse(
                "pet_listing:get", kwargs={"pk": notification_type_id}
            ),
            Notification.NotificationTypes.NEW_REVIEW: "comments",
            Notification.NotificationTypes.NEW_APPLICATION: "applications",
        }

        link = f"{type_to_endpoint[notification_type]}"
        Notification.objects.create(
            **serializer.validated_data, seeker=seeker, link=link
        )


class NotificationRUD(RetrieveUpdateDestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(seeker=self.request.user)
