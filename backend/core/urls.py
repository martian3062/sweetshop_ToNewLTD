from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core.views.sweet import SweetViewSet
from core.views.inventory import PurchaseSweet
from core.views.auth import RegisterView
from core.views.analytics import DemandForecast

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# --------------------
# Router for Sweet APIs
# --------------------
router = DefaultRouter()
router.register(r"sweets", SweetViewSet, basename="sweets")

# --------------------
# URL patterns
# --------------------
urlpatterns = [
    # 🔐 Authentication
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("analytics/forecast/", DemandForecast.as_view()),

    # 🍬 Sweet CRUD + custom actions
    # Includes:
    # GET    /api/sweets/
    # POST   /api/sweets/
    # POST   /api/sweets/generate_random/
    path("", include(router.urls)),

    # 📦 Inventory action
    # POST /api/sweets/<id>/purchase/
    path(
        "sweets/<int:pk>/purchase/",
        PurchaseSweet.as_view(),
        name="purchase-sweet",
    ),
]
