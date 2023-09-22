from django.contrib import admin
from .models import Reservation, VehicleFault, BrakeSystemFault
from .models import CouplingDeviceFault, EngineOperationFault
from .models import ExhaustSystemFault, FuelSystemFault, LightingDevicesFault
from .models import SafetyEquipmentFault, SteeringMechanismFault
from .models import SuspensionFault, TiresFault, WheelFault, WindShieldFault
from .models import MiscellaneousFault, Inspection

# Register your models here.
admin.site.register(Reservation)
admin.site.register(Inspection)
admin.site.register(VehicleFault)
admin.site.register(BrakeSystemFault)
admin.site.register(CouplingDeviceFault)
admin.site.register(EngineOperationFault)
admin.site.register(ExhaustSystemFault)
admin.site.register(FuelSystemFault)
admin.site.register(LightingDevicesFault)
admin.site.register(SafetyEquipmentFault)
admin.site.register(SteeringMechanismFault)
admin.site.register(SuspensionFault)
admin.site.register(TiresFault)
admin.site.register(WheelFault)
admin.site.register(WindShieldFault)
admin.site.register(MiscellaneousFault)



