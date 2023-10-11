from rest_framework import viewsets
from .models import *
from .serializers import *


class AccountViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomerUserSerializer


# Customer
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


# Admin
class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer


# Mechanic
class MechanicViewSet(viewsets.ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer


# TowingProvider
class TowingProviderViewSet(viewsets.ModelViewSet):
    queryset = TowingProvider.objects.all()
    serializer_class = TowingProviderSerializer


# Billing
class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer


# Marketing
class MarketingViewSet(viewsets.ModelViewSet):
    queryset = Marketing.objects.all()
    serializer_class = MarketingSerializer


# Accountant
class AccountantViewSet(viewsets.ModelViewSet):
    queryset = Accountant.objects.all()
    serializer_class = AccountantSerializer
