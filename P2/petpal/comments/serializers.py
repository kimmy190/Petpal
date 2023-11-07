from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import ApplicationComment, ShelterComment


class ShelterCommentSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = ("body", "author")
    author = serializers.CharField(read_only=True)



class ApplicationCommentSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = "__all__"

