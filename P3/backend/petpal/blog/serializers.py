from accounts.serializers import ShelterInfoSerializer
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'created_at', 'image', 'updated_at')
        read_only_fields = ('author', 'created_at', 'updated_at')
    
    author = ShelterInfoSerializer(read_only=True)
