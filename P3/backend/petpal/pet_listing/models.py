from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from accounts.models import PetShelter as Shelter


# Create your models here.
class PetListing(models.Model):
    class Statuses(models.TextChoices):
        AVAILABLE = "Available"
        ADOPTED = "Adopted"
        PEDNING = "Pending"
        WITHDRAWN = "Withdrawn"

    class Genders(models.TextChoices):
        MALE = "Male"
        FEMALE = "Female"

    class Breeds(models.TextChoices):
        GOLDEN_DOODLE = "Golden Doodle"
        BOSTON_TERRIER = "Boston Terrier"
        AUSTRALIAN_TERRIER = "Australian Terrier"

    class Sizes(models.TextChoices):
        LARGE = "Large"
        MEDIUM = "Medium"
        SMALL = "Small"

    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=Statuses.choices)
    publication_date = models.DateTimeField(auto_now_add=True)

    gender = models.CharField(max_length=50, choices=Genders.choices)
    age = models.IntegerField()
    breed = models.CharField(max_length=50, choices=Breeds.choices)
    size = models.CharField(max_length=50, choices=Sizes.choices)
    location = models.CharField(max_length=255, editable=False)

    behavior_aggresive = models.IntegerField(
        default=0, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    behavior_social = models.IntegerField(
        default=0, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    behavior_noisy = models.IntegerField(
        default=0, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    behavior_scared = models.IntegerField(
        default=0, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    behavior_friendly = models.IntegerField(
        default=0, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )

    medical_history = models.TextField()
    requirements = models.TextField()
    additional_comments = models.TextField()


class PetListingImage(models.Model):
    pet_listing = models.ForeignKey(PetListing, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="pet_listing_images/")
