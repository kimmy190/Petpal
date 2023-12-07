from pet_listing.serializers import PetListingSerializer
from accounts.serializers import SeekerSerializer, ShelterInfoSerializer
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Application


class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ["__all__"]
    applicant = SeekerSerializer(read_only=True)
    pet_listing = PetListingSerializer(read_only=True)
    shelter = ShelterInfoSerializer(read_only=True)
    status = serializers.CharField(read_only=True)
