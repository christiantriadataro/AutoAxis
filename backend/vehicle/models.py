from django.db import models
# from reservation.models import Inspection
from account.models import Customer


# Create your models here.
class Vehicle(models.Model):
    vehicle_id = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=40)
    model = models.CharField(max_length=40)
    plate_number = models.CharField(max_length=40)
    type = models.CharField(max_length=40)
    customer = models.ForeignKey(Customer, models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.brand} {self.model} {self.model}"


class CustomerReview(models.Model):
    review_id = models.AutoField(primary_key=True)
    # inspection_id = models.ForeignKey(Inspection, models.CASCADE)
    customer_id = models.ForeignKey(Customer, models.CASCADE)
    vehicle_id = models.ForeignKey(Vehicle, models.CASCADE)
    title = models.CharField(max_length=40)
    body = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} {self.vehicle_id}"


class ServiceReport(models.Model):
    report_id = models.AutoField(primary_key=True)
    # inspection_id = models.ForeignKey(Inspection, models.CASCADE)
    vehicle_id = models.ForeignKey(Vehicle, models.CASCADE)
    customer_id = models.ForeignKey(Customer, models.CASCADE)
    status = models.CharField(max_length=40)

    def __str__(self):
        return f"{self.vehicle_id} {self.status}"
