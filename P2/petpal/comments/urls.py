from django.shortcuts import render
from django.urls import path
from .views import (
    ShelterCommentListCreateView,
    ApplicationCommentListCreateView,
    ReplyCreateView,
)

app_name = "comments"
# TODO PROPER URLS
urlpatterns = [
    path(
        "shelter/<int:shelter>",
        ShelterCommentListCreateView.as_view(),
        name="get_shelter_list",
    ),
    path("replies/<int:parent>", ReplyCreateView.as_view()),
    # path("shelter/<int:shelter>", ShelterCommentListView.as_view()),
    path(
        "application/<int:application>",
        ApplicationCommentListCreateView.as_view(),
        name="get_application_list",
    ),
]
