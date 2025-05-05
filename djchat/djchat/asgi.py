import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djchat.settings")
django.setup()


from django.core.asgi import get_asgi_application  # noqa isort:skip
from channels.routing import ProtocolTypeRouter, URLRouter  # noqa isort:skip
from webchat.middleware import JWTAuthMiddleWare  # noqa isort:skip

django_app = get_asgi_application()

from . import urls  # noqa isort:skip

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleWare(URLRouter(urls.websocketURLPatterns)),
    }
)
