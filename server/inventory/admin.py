from django.contrib import admin
from .models import Category, Product, OrderProduct, Report, Order
# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(OrderProduct)
admin.site.register(Report)
admin.site.register(Order)