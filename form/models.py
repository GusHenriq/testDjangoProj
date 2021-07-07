from django.db import models
from datetime import date

# Create your models here.
class GeneralInfo(models.Model):
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)
    birthday = models.DateField(default=date.today)
    funFact = models.TextField(default="Enter your fun fact here")

    def __str__(self): 
        return (self.lastName + ", " + self.firstName)