from django.db import models
from account.models import Customer, Billing

class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey(Customer, models.CASCADE)
    total_amount = models.DecimalField(decimal_places=2, max_digits=8)
    invoice_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(decimal_places=2, max_digits=8)
    created_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=40)


# Create your models here.
class Payment(models.Model):
    SERVICE_TYPE_CHOICES = [
        ('TOWING REQUEST', 'Towing Request'),
        ('REPAIR RESERVATION', 'Repair Reservation')
    ]
    payment_id = models.AutoField(primary_key=True)
    service_type = models.CharField(max_length=50, choices=SERVICE_TYPE_CHOICES)
    invoice_id = models.OneToOneField(Invoice, models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    billing = models.ForeignKey(Billing, models.CASCADE, null=True, blank=True)
    amount = models.DecimalField(decimal_places=2, max_digits=8)
    balance_status = models.CharField(max_length=40)
    payment_status = models.CharField(max_length=40)


