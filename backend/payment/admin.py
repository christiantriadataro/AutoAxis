from django.contrib import admin
from .models import Payment, Invoice
# Register your models here.
admin.site.register(Payment)
admin.site.register(Invoice)