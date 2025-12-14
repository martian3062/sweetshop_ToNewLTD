import pytest
from core.models import Sweet

@pytest.mark.django_db
def test_create_sweet():
    sweet = Sweet.objects.create(
        name="Barfi",
        category="traditional",
        price=20,
        quantity=10,
    )
    assert sweet.quantity == 10
