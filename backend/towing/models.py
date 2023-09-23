from django.db import models
# from django.contrib.gis.db import models as geo_models

from account.models import Customer, TowingProvider


# Create your models here.

class TowingRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey(Customer, models.CASCADE)
    provider_id = models.ForeignKey(TowingProvider, models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    pickup_location = models.IntegerField()
    dropoff_location = models.IntegerField()
    status = models.CharField(max_length=30)
