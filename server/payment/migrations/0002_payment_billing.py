# Generated by Django 4.2.5 on 2023-09-22 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_billing'),
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='billing',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='account.billing'),
        ),
    ]
