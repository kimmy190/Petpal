# Generated by Django 4.2.6 on 2023-11-07 22:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='applicationcomment',
            old_name='shelter',
            new_name='application',
        ),
    ]
