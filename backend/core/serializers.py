from rest_framework import serializers
from core.models import Sweet


class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = "__all__"
