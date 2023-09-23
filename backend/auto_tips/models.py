from django.db import models
from account.models import Marketing
# Create your models here.
class Tips(models.Model):
    tip_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=40)
    description = models.TextField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    marketing = models.ForeignKey(Marketing, models.CASCADE)