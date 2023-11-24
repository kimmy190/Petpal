from django.contrib import admin

# Register your models here.
from .models import PetSeeker, PetShelter, ShelterImage


# Register your models here.
admin.site.register(PetSeeker)
admin.site.register(PetShelter)
admin.site.register(ShelterImage)
