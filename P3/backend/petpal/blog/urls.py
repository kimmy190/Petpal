from django.urls import path
from .views import PostAPIView

app_name = "blog"

urlpatterns = [
    path('posts/', PostAPIView.as_view(), name='post_list'),
    path('posts/<int:pk>/', PostAPIView.as_view(), name='post_detail'),
    path('posts/<int:pk>/like/', PostAPIView.as_view(), name='post_like'),
]
