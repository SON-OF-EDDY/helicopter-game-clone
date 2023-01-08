from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Member(models.Model):
    name = models.CharField('name',max_length=20)
    password = models.CharField('password',max_length=20)
    high_score = models.IntegerField()

    def __str__(self):
        return self.name