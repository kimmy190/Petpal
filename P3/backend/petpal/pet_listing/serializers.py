from accounts.serializers import ShelterInfoSerializer
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
        # fields = (
        #     "owner",
        #     "pet_name",
        #     "status",
        #     "publication_date",
        #     "gender",
        #     "age",
        #     "breed",
        #     "size",
        #     "location",
        #     "behavior_aggresive",
        #     "behavior_social",
        #     "behavior_noisy",
        #     "behavior_scared",
        #     "behavior_friendly",
        #     "medical_history",
        #     "requirements",
        #     "additional_comments",
        #     "images",
        #     "id",
        # )
        fields = "__all__"

    location = serializers.CharField(read_only=True, source="shelter.address1")
    # shelter = serializers.PrimaryKeyRelatedField(read_only=True)
    shelter = ShelterInfoSerializer(read_only=True)
    images = serializers.ListField(child=serializers.ImageField(), write_only=True)

    behavior_aggresive = serializers.IntegerField(default=0, min_value=0, max_value=5)
    behavior_social = serializers.IntegerField(default=0, min_value=0, max_value=5)
    behavior_noisy = serializers.IntegerField(default=0, min_value=0, max_value=5)
    behavior_scared = serializers.IntegerField(default=0, min_value=0, max_value=5)
    behavior_friendly = serializers.IntegerField(default=0, min_value=0, max_value=5)

    images = PetListingImageSerializer(many=True, read_only=True)
