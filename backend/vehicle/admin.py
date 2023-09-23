from django.contrib import admin
from .models import Vehicle, ServiceReport, CustomerReview
# Register your models here.
admin.site.register(Vehicle)
admin.site.register(ServiceReport)
admin.site.register(CustomerReview)
