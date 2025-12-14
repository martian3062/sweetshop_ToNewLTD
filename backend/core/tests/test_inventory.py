import pytest
from core.models import Sweet

@pytest.mark.django_db
def test_purchase_increments_sold(api_client, user):
    api_client.force_authenticate(user=user)

    sweet = Sweet.objects.create(
        name="Ladoo",
        category="traditional",
        price=10,
        quantity=10
    )

    res = api_client.post(f"/api/sweets/{sweet.id}/purchase/")
    sweet.refresh_from_db()

    assert sweet.sold > 0
    assert sweet.quantity < 10
