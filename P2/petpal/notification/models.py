from django.db import models
from accounts.models import PetSeeker


class Notification(models.Model):
    class NotificationTypes(models.TextChoices):
        APPLICATION_COMMENT = "Application Comment"
        PET_LISTING = "Pet Listing"
        REVIEW_COMMENT = "Review Comment"
        REVIEW_REPLY = "Review Reply"
        APPLICATION = "Application"

    seeker = models.ForeignKey(PetSeeker, on_delete=models.CASCADE, editable=False)
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True, editable=False)
    was_read = models.BooleanField(default=False, blank=True)
    link = models.CharField(max_length=200)
    notification_type = models.CharField(
        max_length=200, choices=NotificationTypes.choices
    )
    notification_type_id = models.IntegerField()
