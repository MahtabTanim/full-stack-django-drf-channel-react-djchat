from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Conversation, Message
from server.models import Channel, Server
from django.contrib.auth import get_user_model

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.accept()
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return self.close(code=4001)

        self.channel_id = str(self.scope["url_route"]["kwargs"]["channel_id"])
        self.server_id = self.scope["url_route"]["kwargs"]["server_id"]
        server = Server.objects.get(id=self.server_id)
        self.is_member = server.member.filter(id=self.user.id).exists()

        self.group_name = f"chat_{self.channel_id}"
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name,
        )

    def receive_json(self, content=None):
        if not self.is_member:
            return
        channel_id = self.channel_id
        sender = self.user
        message = content["message"]
        channel = Channel.objects.get(id=channel_id)
        conversation, _ = Conversation.objects.get_or_create(channel_id=channel)
        new_messae = Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_messae.id,
                    "sender": new_messae.sender.username,
                    "content": new_messae.content,
                    "timestamp": new_messae.timestamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)


def disconnect(self, close_code):
    async_to_sync(self.channel_layer.group_discard)(self.group_name, self.channel_name)
    super().disconnect(close_code)
