# Generated by Django 4.2.4 on 2023-12-19 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_strain_strain_hist_alter_strain_strain_desc_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='strain',
            name='strain_hist',
            field=models.CharField(default=1, max_length=1000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='strain',
            name='strain_desc',
            field=models.CharField(max_length=200),
        ),
        migrations.DeleteModel(
            name='Strain_History',
        ),
    ]