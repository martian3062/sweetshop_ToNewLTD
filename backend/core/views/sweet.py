from rest_framework import viewsets   # ✅ THIS WAS MISSING
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.models import Sweet
from core.serializers import SweetSerializer


class SweetViewSet(viewsets.ModelViewSet):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["post"])
    def generate_random(self, request):
        import random

        names = [
            "Ladoo", "Barfi", "Rasgulla", "Jalebi",
            "Kaju Katli", "Gulab Jamun", "Peda", "Halwa"
        ]
        categories = ["traditional", "chocolate", "dryfruit", "milk"]

        items = []
        for _ in range(10):
            sweet = Sweet.objects.create(
                name=random.choice(names),
                category=random.choice(categories),
                price=random.randint(10, 100),
                quantity=random.randint(5, 50),
            )
            items.append(SweetSerializer(sweet).data)

        return Response({
            "message": "Random sweets added",
            "items": items
        })
