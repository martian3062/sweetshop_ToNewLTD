import pytest
from core.models.sweet import Sweet

@pytest.mark.django_db
def test_purchase_reduces_quantity(api_client, user):
    api_client.force_authenticate(user=user)

    sweet = Sweet.objects.create(
        name="Ladoo",
        category="traditional",
        price=10,
        quantity=5,
    )

    res = api_client.post(f"/api/sweets/{sweet.id}/purchase/")
    sweet.refresh_from_db()

    assert res.status_code == 200
    assert sweet.quantity == 4
