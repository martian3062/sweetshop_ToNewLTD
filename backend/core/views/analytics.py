from rest_framework.views import APIView
from rest_framework.response import Response
from core.models import Sweet

class DemandForecast(APIView):
    def get(self, request):
        forecasts = []

        for s in Sweet.objects.all():
            forecast = round(s.sold / 7, 2) if s.sold > 0 else 1
            forecasts.append({
                "name": s.name,
                "forecast_daily_demand": forecast,
                "recommended_stock": int(forecast * 10)
            })

        return Response(forecasts)
