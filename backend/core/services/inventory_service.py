from django.db import transaction
from core.models import Sweet

class InventoryService:

    @staticmethod
    @transaction.atomic
    def purchase(sweet_id: int):
        sweet = Sweet.objects.select_for_update().get(id=sweet_id)
        if sweet.quantity <= 0:
            raise ValueError("Out of stock")

        sweet.quantity -= 1
        sweet.save()
        return sweet

    @staticmethod
    @transaction.atomic
    def restock(sweet_id: int, amount: int):
        sweet = Sweet.objects.select_for_update().get(id=sweet_id)
        sweet.quantity += amount
        sweet.save()
        return sweet
