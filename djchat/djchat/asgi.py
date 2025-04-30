from channels.routing import ProtocolTypeRouter, URLRouter

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djchat.settings")

django_app = get_asgi_application()

from . import urls  # noqa isort:skip

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": URLRouter(urls.websocketURLPatterns),
    }
)
