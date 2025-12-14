from django.db import models

class Sweet(models.Model):
    CATEGORY_CHOICES = [
        ("traditional", "Traditional"),
        ("chocolate", "Chocolate"),
        ("dryfruit", "Dry Fruit"),
        ("milk", "Milk Based"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    sold = models.PositiveIntegerField(default=0)  # ✅ NEW

    def __str__(self):
        return self.name


    def __str__(self):
        return self.name
