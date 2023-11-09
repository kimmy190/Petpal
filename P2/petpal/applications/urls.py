from django.shortcuts import render
from django.urls import path
from .views import ApplicationCreateView, ApplicationUpdateView, ApplicationListView
from django.http import HttpResponseNotFound

app_name = "applications"


def favicon_404(request):
    return HttpResponseNotFound()


urlpatterns = [path("", ApplicationCreateView.as_view()),
               path("<int:pk>/update/", ApplicationUpdateView.as_view()),
               path("list/", ApplicationListView.as_view()),
               ]
