from django.shortcuts import render
from django.urls import path
from .views import (
    ShelterCommentListCreateView,
    ApplicationCommentListCreateView,
)

app_name = "comments"
# TODO PROPER URLS
urlpatterns = [
    path("shelter/<int:shelter>", ShelterCommentListCreateView.as_view()),
    # path("shelter/<int:shelter>", ShelterCommentListView.as_view()),
    path("application/<int:application>", ApplicationCommentListCreateView.as_view()),
]
