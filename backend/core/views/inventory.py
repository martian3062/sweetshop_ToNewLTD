import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.models import Sweet

class PurchaseSweet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        sweet = Sweet.objects.get(pk=pk)

        if sweet.quantity <= 0:
            return Response({"error": "Out of stock"}, status=400)

        demand = random.randint(1, 3)

        actual = min(demand, sweet.quantity)
        sweet.quantity -= actual
        sweet.sold += actual  # ✅ track sales
        sweet.save()

        return Response({
            "message": "Purchase successful",
            "sold_now": actual,
            "remaining": sweet.quantity,
            "total_sold": sweet.sold
        })
