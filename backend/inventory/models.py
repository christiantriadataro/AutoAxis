from django.db import models

from account.models import Customer


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


# Product Model
class Product(models.Model):
    product_name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    stock_quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    supplier = models.CharField(max_length=255)
    manufacturing_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name


# Order Model
class Order(models.Model):
    order_date = models.DateField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_status = models.CharField(max_length=20)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.TextField()
    payment_method = models.CharField(max_length=20)
    delivery_date = models.DateField()

    # Many-to-Many relationship with Product
    ordered_products = models.ManyToManyField(Product, through='OrderProduct')

    def __str__(self):
        return f"Order #{self.pk}"


# Intermediate model for the many-to-many relationship between Order and Product
class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.order}-{self.product}"

# Report Model
class Report(models.Model):
    report_type = models.CharField(max_length=255)
    report_date = models.DateField()
    generated_by = models.CharField(max_length=255)
    report_content = models.TextField()
    filters_parameters = models.TextField()
    export_options = models.CharField(max_length=255)
    access_permissions = models.ManyToManyField('auth.Group')

    def __str__(self):
        return f"{self.report_type} - {self.report_date}"
