from django.contrib.auth.models import AnonymousUser
from jwt import decode as jwt_decode
from jwt.exceptions import InvalidTokenError
from django.conf import settings
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async


@database_sync_to_async
def get_user(user_id):
    User = get_user_model()
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


class JWTAuthMiddleWare:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, recieve, send):
        headers = dict(scope["headers"])
        raw_cookie = headers.get(b"cookie", b"").decode()
        cookies = dict(
            item.split("=") for item in raw_cookie.split("; ") if "=" in item
        )

        access_token = cookies.get("access")
        if access_token:
            try:
                decoded = jwt_decode(
                    access_token, settings.SECRET_KEY, algorithms=["HS256"]
                )
                scope["user"] = await get_user(decoded["user_id"])
            except InvalidTokenError:
                scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await self.app(scope, recieve, send)
