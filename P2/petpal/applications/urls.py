from django.shortcuts import render
from django.urls import path
from .views import ApplicationCreateView, ApplicationUpdateView, ApplicationListView
from django.http import HttpResponseNotFound

app_name = "applications"


def favicon_404(request):
    return HttpResponseNotFound()


urlpatterns = [path("<int:pet_listing>/", ApplicationCreateView.as_view()),
               path("<int:pk>/update",
                    ApplicationUpdateView.as_view()),
               path("", ApplicationListView.as_view()),
               ]
