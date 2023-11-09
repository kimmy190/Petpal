# Generated by Django 4.2.4 on 2023-11-09 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('applications', '0002_application_owner_application_shelter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='shelter',
            field=models.OneToOneField(max_length=50, on_delete=django.db.models.deletion.CASCADE, to='accounts.shelter'),
        ),
    ]
