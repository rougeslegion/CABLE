from django.db import models

# Create your models here.
class Strain(models.Model):
    domain = models.CharField(max_length=100)
    phylum = models.CharField(max_length=100)
    tax_class = models.CharField(max_length=100)
    tax_order = models.CharField(max_length=100)
    family = models.CharField(max_length=100)
    genus = models.CharField(max_length=100)
    sci_name = models.CharField(max_length=100)
    strain_desc = models.CharField(max_length=200)
    species = models.CharField(max_length=100)
    is_type_strain = models.BooleanField()
    is_bacdive = models.BooleanField()
    strain_hist = models.CharField(max_length=1000)    

class Cul_coll_no(models.Model):
    strain = models.ForeignKey(Strain, related_name="cc_nums", on_delete=models.CASCADE)
    cn = models.CharField(max_length=100)