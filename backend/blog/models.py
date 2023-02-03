from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager
from datetime import datetime
class User(AbstractUser):
    email = models.EmailField(verbose_name='email',unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()


    def __str__(self):
        return self.email

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="posts")
    body = models.TextField()
    #image = models.ImageField()
    createdAt=models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="likedposts")
    comments = models.ManyToManyField(User, through="Comment", through_fields=('post','user'), related_name="commentedposts")

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.body

class Comment(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.body