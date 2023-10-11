from rest_framework import serializers
from .models import *


class CustomerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = Customer
        fields = '__all__'


class AdminSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = Admin
        fields = '__all__'


class MechanicSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = Mechanic
        fields = '__all__'


class TowingProviderSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = TowingProvider
        fields = '__all__'


class BillingSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = Customer
        fields = '__all__'


# Marketing
class MarketingSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = Marketing
        fields = '__all__'


# Accoutant
class AccountantSerializer(serializers.ModelSerializer):
    user = CustomerUserSerializer

    class Meta:
        model = Accountant
        fields = '__all__'
