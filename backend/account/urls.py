from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r"accounts", AccountViewSet)
router.register(r"customers", CustomerViewSet)
router.register(r"admins", AdminViewSet)
router.register(r"mechanics", MechanicViewSet)
router.register(r"towing-providers", TowingProviderViewSet)
router.register(r"billings", BillingViewSet)
router.register(r"marketing", MarketingViewSet)
router.register(r"accountants", AccountantViewSet)


urlpatterns = [
    path('', include(router.urls))
]

