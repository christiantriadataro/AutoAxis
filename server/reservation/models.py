from django.db import models

from account.models import Customer, Mechanic
from vehicle.models import Vehicle

CHOICES = [
    ("OK", "OK"),
    ("NEEDS REPAIR", "Needs Repair"),
    ("NOT APPLICABLE", "Not Applicable"),
    ("REPAIRED", "Repaired"),
]


class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)


class VehicleFault(models.Model):
    CONDITION_CHOICES = [
        ("EXCELLENT", "Excellent"),
        ("GOOD", "Good"),
        ("AVERAGE", "Average"),
        ("POOR", "Poor"),
        ("HIGH RISK", "High Risk"),
    ]
    fault_id = models.AutoField(primary_key=True)
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    description = models.TextField(max_length=450)
    condition = models.CharField(max_length=25, choices=CONDITION_CHOICES)
    recommendation = models.TextField(max_length=250)


class BrakeSystemFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    service_brake = models.CharField(max_length=20, choices=CHOICES)
    parking_brake = models.CharField(max_length=20, choices=CHOICES)
    rotor = models.CharField(max_length=20, choices=CHOICES)
    brake_hose = models.CharField(max_length=20, choices=CHOICES)
    low_pressuree_device = models.CharField(max_length=20, choices=CHOICES)


class CouplingDeviceFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    fifth_wheel = models.CharField(max_length=20, choices=CHOICES)
    pintle_hooks = models.CharField(max_length=20, choices=CHOICES)
    drawbar = models.CharField(max_length=20, choices=CHOICES)


class EngineOperationFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    fan = models.CharField(max_length=20, choices=CHOICES)
    oil_pressure = models.CharField(max_length=20, choices=CHOICES)
    radiator = models.CharField(max_length=20, choices=CHOICES)
    battery = models.CharField(max_length=20, choices=CHOICES)


class ExhaustSystemFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    driver_position_exhaust = models.CharField(max_length=20, choices=CHOICES)
    fuel_line_exhaust = models.CharField(max_length=20, choices=CHOICES)
    muffler = models.CharField(max_length=20, choices=CHOICES)


class FuelSystemFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    visible_leak = models.CharField(max_length=20, choices=CHOICES)
    fuel_tank_filler_cap = models.CharField(max_length=20, choices=CHOICES)
    fuel_tank = models.CharField(max_length=20, choices=CHOICES)


class LightingDevicesFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    head_light = models.CharField(max_length=20, choices=CHOICES)
    brake_light = models.CharField(max_length=20, choices=CHOICES)
    tail_light = models.CharField(max_length=20, choices=CHOICES)
    dash_light = models.CharField(max_length=20, choices=CHOICES)
    clearance_light = models.CharField(max_length=20, choices=CHOICES)
    turn_indicator = models.CharField(max_length=20, choices=CHOICES)


class SafetyEquipmentFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    seat_belt = models.CharField(max_length=20, choices=CHOICES)
    fire_extinguisher = models.CharField(max_length=20, choices=CHOICES)
    flare = models.CharField(max_length=20, choices=CHOICES)
    decal = models.CharField(max_length=20, choices=CHOICES)
    spare_bulb = models.CharField(max_length=20, choices=CHOICES)
    turn_indicator = models.CharField(max_length=20, choices=CHOICES)


class SteeringMechanismFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    steering_wheel = models.CharField(max_length=20, choices=CHOICES)
    steering_column = models.CharField(max_length=20, choices=CHOICES)
    front_axel_beam = models.CharField(max_length=20, choices=CHOICES)
    steering_gear_box = models.CharField(max_length=20, choices=CHOICES)
    pitman_arm = models.CharField(max_length=20, choices=CHOICES)
    power_steering = models.CharField(max_length=20, choices=CHOICES)
    ball_and_socket_joints = models.CharField(max_length=20, choices=CHOICES)
    tie_rods = models.CharField(max_length=20, choices=CHOICES)


class SuspensionFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    spring_assembly_and_bolts = models.CharField(max_length=20, choices=CHOICES)
    tracking_components = models.CharField(max_length=20, choices=CHOICES)


class TiresFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    condition = models.CharField(max_length=20, choices=CHOICES)
    air_pressure = models.CharField(max_length=20, choices=CHOICES)
    chains = models.CharField(max_length=20, choices=CHOICES)


class WheelFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    wheel_and_rims = models.CharField(max_length=20, choices=CHOICES)
    lock_or_side_rings = models.CharField(max_length=20, choices=CHOICES)
    fasteners = models.CharField(max_length=20, choices=CHOICES)
    welds = models.CharField(max_length=20, choices=CHOICES)


class WindShieldFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    glass = models.CharField(max_length=20, choices=CHOICES)
    wiper_power_unit = models.CharField(max_length=20, choices=CHOICES)


class MiscellaneousFault(models.Model):
    fault_id = models.AutoField(primary_key=True)
    transmission_fluid = models.CharField(max_length=20, choices=CHOICES)
    clutch = models.CharField(max_length=20, choices=CHOICES)
    heater = models.CharField(max_length=20, choices=CHOICES)
    mirror = models.CharField(max_length=20, choices=CHOICES)
    frame = models.CharField(max_length=20, choices=CHOICES)
    body = models.CharField(max_length=20, choices=CHOICES)


class Inspection(models.Model):
    inspection_id = models.AutoField(primary_key=True)
    mechanic = models.ForeignKey(Mechanic, models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, models.CASCADE)
    customer = models.ForeignKey(Customer, models.CASCADE)
    # vehicle_fault = models.ForeignKey(VehicleFault, models.CASCADE)
    # brake_system_fault = models.ForeignKey(BrakeSystemFault, models.CASCADE)

