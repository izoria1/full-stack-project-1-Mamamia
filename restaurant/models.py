from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework import permissions


class CustomUser(AbstractUser):
    is_staff_member = models.BooleanField(default=False)
    # Add other fields as needed


class Booking(models.Model):
    ID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    No_of_guests = models.IntegerField()
    BookingDate = models.DateTimeField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.Name

class Menu(models.Model):
    ID = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=255)
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    Inventory = models.IntegerField()

    def __str__(self):
        return self.Title
