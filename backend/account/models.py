from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class MyUser(AbstractUser):
    profile = models.ImageField(upload_to='profiles', blank=True, null=True)

    class Meta:
        ordering = ['id']