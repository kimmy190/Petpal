from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import PetListing, PetListingImage


class PetListingImageSerializer(ModelSerializer):
    class Meta:
        model = PetListingImage
        fields = "__all__"

    pet_listing = serializers.PrimaryKeyRelatedField(read_only=True)


class PetListingSerializer(ModelSerializer):
    class Meta:
        model = PetListing
        fields = "__all__"

    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    images = serializers.ListField(child=PetListingImageSerializer(), write_only=True)
