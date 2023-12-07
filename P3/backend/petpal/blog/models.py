from django.db import models
from accounts.models import PetSeeker


class BlogPost(models.Model):
    seeker = models.ForeignKey(
        PetSeeker, on_delete=models.CASCADE, related_name="blogs"
    )
    message = models.TextField()
    image = models.ImageField(upload_to="blog_images/", null=True, blank=True)
