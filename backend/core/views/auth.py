from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):
    permission_classes = []

    def post(self, request):
        user = User.objects.create_user(
            username=request.data["username"],
            password=request.data["password"],
        )
        return Response({"id": user.id})
