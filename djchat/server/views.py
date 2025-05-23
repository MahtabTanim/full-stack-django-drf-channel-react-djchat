from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Server, Category, Channel
from .serializers import (
    ChannelSerializer,
    ServerSerializer,
    CategorySerializer,
    MessageSeriaLizer,
)
from rest_framework.exceptions import AuthenticationFailed
from . import schema
from webchat.models import Message, Conversation
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class ServerMembershipViewset(ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request, server_id):
        server = get_object_or_404(Server, id=server_id)
        user = request.user
        if server is not None and user is not None:
            if server.member.filter(id=user.id).exists():
                return Response(
                    {"message": "User already in the Server"},
                    status=status.HTTP_409_CONFLICT,
                )
            server.member.add(user)
            return Response(
                {"message": "User successfully added in the Server"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "User/Server not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    @action(
        detail=False,
        methods=[
            "DELETE",
        ],
    )
    def remove_member(self, request, server_id=None):
        server = get_object_or_404(Server, id=server_id)
        user = request.user
        if server is not None and user is not None:
            print(user, server.owner)
            if user == server.owner:
                return Response(
                    {"message": "Owner cant leave the server"},
                    status=status.HTTP_409_CONFLICT,
                )
            if not server.member.filter(id=user.id).exists():
                return Response(
                    {"message": "User Not Found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            server.member.remove(user)
            return Response(
                {"message": "User successfully removed from the Server"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "User/Server not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    @action(
        detail=False,
        methods=[
            "GET",
        ],
    )
    def is_member(self, request, server_id=None):
        server = get_object_or_404(Server, id=server_id)
        user = request.user
        if server is not None and user is not None:
            status = server.member.filter(id=user.id).exists()
            return Response({"is_member": status})
        return Response(
            {"message": "User/Server not found"},
            status=status.HTTP_404_NOT_FOUND,
        )


class ServerListViewSet(ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    http_method_names = ["get", "post"]

    @schema.sever_list_params
    def list(self, request):
        """
        Retrieves a list of servers based on the provided filters.

        This endpoint allows fetching servers with optional filtering by category,
        user membership, and quantity. It raises an `AuthenticationFailed` exception
        if the user attempts to filter by their membership without being authenticated.

        Args:
            request (Request): The HTTP request object, containing optional query parameters:
                - `category` (str, optional): The category to filter servers by.
                - `by_user` (bool, optional): If set `true`, filters servers by logged In user
                - `qty` (int, optional): The number of servers to return.

        Raises:
            AuthenticationFailed: If the `by_user` filter is used and user is not authenticated.

        Returns:
            Response: A response containing a serialized list of servers matching the filters,
                    with an HTTP 200 status on success.
        """

        servers = self.queryset
        category = request.GET.get("category")
        by_user = request.query_params.get("by_user") == "true"
        qty = request.query_params.get("qty")
        # total_members = request.query_params.get("total_members") == "true"
        if by_user and not request.user.is_authenticated:
            raise AuthenticationFailed()
        if category:
            servers = servers.filter(category__name=category)
        if by_user:
            user_id = request.user.id
            servers = servers.filter(member=user_id)
        # if total_members:
        #     servers = servers.annotate(total_members=Count("member"))
        if qty:
            servers = servers[: int(qty)]

        data = ServerSerializer(
            servers,
            many=True,
            context={"request": request},
            # context={"total_members": total_members,}
        ).data
        return Response(data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = ServerSerializer(data=request.data)
        if serializer.is_valid():
            server = Server.objects.create(**serializer.validated_data)
            return Response(
                ServerSerializer(server).data, status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ["get", "post"]


class ChannelListViewSet(ModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    http_method_names = ["get", "post"]


class MessageListViewSet(ModelViewSet):
    serializer_class = MessageSeriaLizer
    queryset = Message.objects.all()
    http_method_names = ["get", "post"]

    def get_queryset(self):
        try:
            channel_id = self.request.query_params.get("channel_id")
            if not channel_id:
                return []
            channel = Channel.objects.get(id=channel_id)
            if not channel:
                return []
            conversation = Conversation.objects.get(channel_id=channel)
            if not conversation:
                return []
            messages = conversation.converstation_message.all()
            return messages
        except Conversation.DoesNotExist:
            return []

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
