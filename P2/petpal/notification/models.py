from django.db import models
from accounts.models import PetSeeker


class Notification(models.Model):
    class NotificationTypes(models.TextChoices):
        APPLICATION_MESSAGE = "Application Message"
        STATUS_UPDATE = "Status Update"
        NEW_PET_LISTING = "New Pet Listing"
        NEW_REVIEW = "New Review"
        NEW_APPLICATION = "New Application"

    seeker = models.ForeignKey(PetSeeker, on_delete=models.CASCADE, editable=False)
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True, editable=False)
    was_read = models.BooleanField(default=False, blank=True)
    link = models.CharField(max_length=200)
    notification_type = models.CharField(
        max_length=200, choices=NotificationTypes.choices
    )
    notification_type_id = models.IntegerField()
