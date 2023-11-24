from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


class PetSeeker(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)

class PetShelter(models.Model): 
    user = models.OneToOneField(PetSeeker, related_name='shelter',on_delete=models.CASCADE, default="")
    organization_name = models.CharField(max_length=200) # maybe can just username 
    logo_image = models.ImageField(upload_to='logo_images/', null=True, blank=True)
    # added custom library for phone number field 
    phone_number = PhoneNumberField()
    # shelter_image = models.ImageField(upload_to='shelter_images/)
    mission_statement = models.TextField(max_length=10000)
    country = models.CharField(max_length=100)
    address1 = models.CharField(max_length = 100)
    address2 = models.CharField(max_length = 100, null=True, blank = True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip = models.CharField(max_length=10)


class ShelterImage(models.Model):
    shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="shelter_images/", null=True, blank=True)



