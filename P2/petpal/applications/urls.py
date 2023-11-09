from django.shortcuts import render
from django.urls import path
from .views import ApplicationCreateView, ApplicationUpdateView, ApplicationListView

app_name = "applications"
urlpatterns = [path("", ApplicationCreateView.as_view()),
               path("<int:pk>/update/", ApplicationUpdateView.as_view()),
               path("list/", ApplicationListView.as_view()),
               ]
