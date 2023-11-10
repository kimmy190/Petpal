from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Application
from accounts.models import PetSeeker


class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ["__all__"]
    applicant = serializers.PrimaryKeyRelatedField(read_only=True)
    pet_listing = serializers.PrimaryKeyRelatedField(read_only=True)
    shelter = serializers.PrimaryKeyRelatedField(read_only=True)
