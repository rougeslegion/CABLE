from rest_framework import serializers
from .models import (Strain, Cul_coll_no)

class StrainSerializer(serializers.ModelSerializer):
    sci_name = serializers.CharField(required=False)
    strain_hist = serializers.CharField(required=False)
    strain_desc = serializers.CharField(required=False)
    domain = serializers.CharField(required=False)
    phylum = serializers.CharField(required=False)
    tax_class = serializers.CharField(required=False)
    tax_order = serializers.CharField(required=False)
    family = serializers.CharField(required=False)
    genus = serializers.CharField(required=False)
    species = serializers.CharField(required=False)
   
    class Meta:
        model = Strain
        fields = "__all__"

class CulColNoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cul_coll_no
        fields = "__all__"