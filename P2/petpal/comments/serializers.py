from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import ApplicationComment, ShelterComment


class ShelterCommentSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = ("id", "body", "author", "created_at")
    author = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)



class ApplicationCommentSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = ("id", "body", "author", "created_at")

