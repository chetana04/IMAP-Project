from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        # Ensure the username field is set to a unique value based on email.
        extra_fields.setdefault(
            'username', self.model.objects.make_random_password())

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    mobileNumber = models.CharField(max_length=20, default="")
    portfolio = models.CharField(max_length=200, default="")
    address = models.CharField(max_length=200, default="")
    carrierObjective = models.TextField(default="")

    education = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    experience = models.JSONField(default=list)
    projects = models.JSONField(default=list)

    timestamps = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()
    username = None
    # Use 'email' as the unique identifier for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
