from django.db import models

class Sweet(models.Model):
    CATEGORY_CHOICES = [
        ("chocolate", "Chocolate"),
        ("candy", "Candy"),
        ("traditional", "Traditional"),
        ("pastry", "Pastry"),
    ]

    name = models.CharField(max_length=120)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
