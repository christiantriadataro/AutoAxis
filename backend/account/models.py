from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.IntegerField()
    address = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']

    groups = models.ManyToManyField(Group, related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_set', blank=True)


    def __str__(self):
        return f"{self.email} - {self.first_name} {self.last_name}"

class Customer(CustomUser):
    # user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='customer_account')
    customer_id = models.AutoField(primary_key=True)
    def __str__(self):
        return f"{self.customer_id} - {self.first_name} {self.last_name}"


class Admin(CustomUser):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='admin_account')
    admin_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.admin_id} - {self.first_name} {self.last_name}"


class Mechanic(CustomUser):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='mechanic_account')
    mechanic_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.mechanic_id} - {self.first_name} {self.last_name}"


class TowingProvider(CustomUser):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='towingprovider_account')
    provider_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.provider_id} - {self.first_name} {self.last_name}"


class Billing(CustomUser):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='billing_account')
    billing_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.billing_id} - {self.first_name} {self.last_name}"


class Marketing(CustomUser):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='marketing_account')
    marketing_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.marketing_id} - {self.first_name} {self.last_name}"


class Accountant(CustomUser):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='accountant_account')
    accountant_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.accountant_id} - {self.first_name} {self.last_name}"
