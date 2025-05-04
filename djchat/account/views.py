from .models import User
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings

# Create your views here.


class UserListViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        try:
            user_id = self.request.query_params.get("user_id")
            if not user_id:
                return User.objects.all()
        except User.DoesNotExist:
            return []


class JwtSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )
            del response.data["access"]
        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JwtSetCookieMixin, TokenObtainPairView):
    pass


class JWTCookieTokenRefreshView(TokenObtainPairView, TokenRefreshView):
    pass
