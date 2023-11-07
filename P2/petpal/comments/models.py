from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Comment (models.Model):
    body = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    # TODO switch to our custom user
    author = models.ForeignKey(User, on_delete=models.CASCADE)

class ShelterComment(Comment):
    shelter = models.ForeignKey(User, on_delete=models.CASCADE)


class ApplicationComment(Comment):
    application = models.ForeignKey(User, on_delete=models.CASCADE)
