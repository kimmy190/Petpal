from rest_framework.serializers import ModelSerializer
from django.db import models

from .models import Notification
from rest_framework import serializers


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
        read_only_fields = ("link",)

    create_only_fields = ("notification_type", "notification_type_id", "message")

    # Taken from https://stackoverflow.com/questions/53028241/django-rest-framework-allow-a-serializer-field-to-be-created-but-not-edited
    def to_internal_value(self, data):
        data = super(ModelSerializer, self).to_internal_value(data)
        if self.instance:
            # update
            for x in self.create_only_fields:
                data.pop(x, "")
        return data
