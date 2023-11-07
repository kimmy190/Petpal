from django.shortcuts import render
from django.urls import path
from .views import (
    ShelterCommentCreateView,
    ShelterCommentListView,
)

app_name = "comments"
# TODO PROPER URLS
urlpatterns = [
    path("<int:shelter>", ShelterCommentCreateView.as_view()),
    path("shelter/<int:shelter>", ShelterCommentListView.as_view()),
]
