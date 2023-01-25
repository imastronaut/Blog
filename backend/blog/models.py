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
    user = models.ForeignKey(User,on_delete = models.CASCADE, related_name="posts")
    description = models.TextField(null=True,blank=True)
    #image = models.ImageField(null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User,related_name="likes")

    def __str__(self):
        return self.description

class Comment(models.Model):
    post = models.ForeignKey(Post,on_delete = models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.SET_NULL,blank=True,null=True, related_name="comments")
    description = models.TextField(null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    

    def __str__(self):
        return self.description
