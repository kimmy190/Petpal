from django.db import models
from accounts.models import PetShelter, PetSeeker

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(PetShelter, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True)


    def total_likes(self):
        return Like.objects.filter(post=self).count()

    def __str__(self):
        return self.title

class Like(models.Model):
    user = models.ForeignKey(PetSeeker, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')
