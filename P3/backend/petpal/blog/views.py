from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer
from .models import Post
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist


@permission_classes([IsAuthenticated])
class PostAPIView(APIView):
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        try:
            if request.user.shelter and serializer.is_valid():
                serializer.save(author=request.user.shelter)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            raise PermissionDenied
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        print("GOT", pk)
        if pk is not None:
            post = get_object_or_404(Post, pk=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        author_id = request.query_params.get("author_id", None)
        if author_id is not None:
            posts = Post.objects.filter(author_id=author_id)
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if pk is not None:
            post = get_object_or_404(Post, pk=pk)
            if post.author == request.user:
                return Response(
                    "You cannot like your own post.", status=status.HTTP_400_BAD_REQUEST
                )
            if request.user in post.likes.all():
                return Response(
                    "You have already liked this post.",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            post.likes.add(request.user)
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
