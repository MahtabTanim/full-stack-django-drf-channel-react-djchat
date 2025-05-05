from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet, CategoryListViewSet, MessageListViewSet
from django.conf import settings
from django.conf.urls.static import static
from webchat.consumer import WebChatConsumer
from account.views import (
    UserListViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogOutApiView,
)

router = DefaultRouter()
router.register("api/server/select", ServerListViewSet, basename="server")
router.register("api/categories/select", CategoryListViewSet, basename="categories")
router.register("api/messages", MessageListViewSet, basename="messages")
router.register("api/user", UserListViewSet, basename="user_list")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "api/token/refresh", JWTCookieTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("api/logout", LogOutApiView.as_view(), name="logout-"),
    path(
        "api/schema/ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
] + router.urls

websocketURLPatterns = [
    path("<str:server_id>/<str:channel_id>", WebChatConsumer.as_asgi()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
