from django.contrib import admin
from .models import Customer, Mechanic, TowingProvider, Marketing, Accountant, Admin, Billing


admin.site.register(Customer)
admin.site.register(Admin)
admin.site.register(Mechanic)
admin.site.register(TowingProvider)
admin.site.register(Marketing)
admin.site.register(Accountant)
admin.site.register(Billing)