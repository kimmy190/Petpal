from django.shortcuts import render
from django.urls import path

from .views import NotificaitonListCreate, NotificationRUD

app_name = "notification"
urlpatterns = [
    path("", NotificaitonListCreate.as_view()),
    path("<int:pk>", NotificationRUD.as_view()),
]
