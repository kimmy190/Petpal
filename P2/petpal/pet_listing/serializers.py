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

    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    images = serializers.ListField(child=serializers.ImageField(), write_only=True)

    behavior_aggresive = serializers.IntegerField(default=0)
    behavior_social = serializers.IntegerField(default=0)
    behavior_noisy = serializers.IntegerField(default=0)
    behavior_scared = serializers.IntegerField(default=0)
    behavior_friendly = serializers.IntegerField(default=0)
