from django.db import models
from django.contrib.auth.models import User
from accounts.models import PetSeeker, PetShelter
from pet_listing.models import PetListing


class Application(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        ACCEPTED = "Accepted", "Accepted"
        DENIED = "Denied", "Denied"
        WITHDRAWN = "Withdrawn", "Withdrawn"

    PET_OWNERSHIP_CHOICES = (
        ('yes', 'YES'),
        ('no', 'NO'),
    )

    HOME_OWNERSHIP_CHOICES = (
        ('own', 'Own'),
        ('rent', 'Rent'),
    )

    applicant = models.ForeignKey(PetSeeker, on_delete=models.CASCADE)
    pet_listing = models.ForeignKey(PetListing, on_delete=models.CASCADE)
    shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE)

    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.PENDING, editable=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now=True)

    # names
    pet_name = models.CharField(max_length=50)
    owner_name = models.CharField(max_length=50, default="")

    # contacts
    area_code = models.CharField(max_length=4)
    phone_number = models.CharField(max_length=10)
    email = models.EmailField()

    # location
    address1 = models.CharField(max_length=100)
    address2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip = models.CharField(max_length=10)
    country = models.CharField(max_length=100)

    # other
    pet_ownership = models.CharField(
        max_length=3, choices=PET_OWNERSHIP_CHOICES)
    breed = models.TextField()
    past_pet = models.TextField()
    home_ownership = models.CharField(
        max_length=4, choices=HOME_OWNERSHIP_CHOICES)
    signature = models.CharField(max_length=255)
