from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from accounts.models import PetSeeker, PetShelter
from applications.models import Application


# Create your models here.
class Comment(models.Model):
    body = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    # TODO switch to our custom user
    author = models.ForeignKey(PetSeeker, on_delete=models.CASCADE)
    class Meta:
        abstract = True


class ShelterComment(Comment):
    shelter = models.ForeignKey(PetShelter, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
class Reply(Comment):
    parent = models.ForeignKey(PetShelter, on_delete=models.CASCADE)


class ApplicationComment(Comment):
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
