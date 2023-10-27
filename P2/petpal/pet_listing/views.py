# Create your views here.

from typing import Any
from django.http import HttpRequest, HttpResponse
from django.views.generic.edit import CreateView, UpdateView
from .models import PetListing, PetListingImage


class PetListingCreateView(CreateView):
    model = PetListing
    fields = "__all__"

    def get(self, request: HttpRequest, *args: str, **kwargs: Any) -> HttpResponse:
        return HttpResponse("THIS WORKS!")
