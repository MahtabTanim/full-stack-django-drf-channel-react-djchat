from .models import User
from rest_framework.viewsets import ModelViewSet
from .serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class UserListViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    http_method_names = ["get", "post"]


class JwtSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
                secure=True,
                domain=settings.SIMPLE_JWT["JWT_COOKIE_DOMAIN"],
            )
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
                secure=True,
                domain=settings.SIMPLE_JWT["JWT_COOKIE_DOMAIN"],
            )
            del response.data["access"]
        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JwtSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JwtSetCookieMixin, TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class LogOutApiView(APIView):
    def post(self, request, format=None):
        response = Response("Logged Out Successfully")
        cookie_settings = {
            "httponly": True,
            "samesite": settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            "secure": True,
            "domain": settings.SIMPLE_JWT["JWT_COOKIE_DOMAIN"],
        }
        response.set_cookie("refresh", "", expires=0, **cookie_settings)
        response.set_cookie("access", "", expires=0, **cookie_settings)
        return response
