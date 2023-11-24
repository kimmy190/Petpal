from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import ApplicationComment, ShelterComment, Comment, Reply

class ReplySerializer(ModelSerializer):
    class Meta:
        abstract = True
        model = Reply
        fields = ("id", "body", "author", "created_at")
        read_only_fields = ["author", "created_at"]

class ApplicationCommentSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = ("id", "body", "author", "created_at")
        read_only_fields = ["author", "created_at"]

class ShelterCommentSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = ("id", "rating", "body", "author", "created_at", "reply")
        read_only_fields = ["author", "created_at"]
        # depth = 1
    reply = ReplySerializer(many=True, read_only=True)

