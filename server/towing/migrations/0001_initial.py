# Generated by Django 4.2.5 on 2023-09-22 12:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TowingRequest',
            fields=[
                ('request_id', models.AutoField(primary_key=True, serialize=False)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('pickup_location', models.IntegerField()),
                ('dropoff_location', models.IntegerField()),
                ('status', models.CharField(max_length=30)),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.customer')),
                ('provider_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.towingprovider')),
            ],
        ),
    ]
