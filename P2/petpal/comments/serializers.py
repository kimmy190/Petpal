from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import ApplicationComment, ShelterComment

class CommentSerializer(ModelSerializer):
    class Meta:
        abstract = True
        model = ShelterComment
        fields = ("id", "body", "author", "created_at")
        read_only_fields = ["author", "created_at"]

class ShelterCommentSerializer(CommentSerializer):
    class Meta:
        model = ShelterComment
        fields = ("id", "rating", "body", "author", "created_at")
        read_only_fields = ["author", "created_at"]
