from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Server
from .serializers import ServerSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.db.models import Count

# Create your views here.


class ServerListViewSet(ViewSet):

    def list(self, request):
        servers = Server.objects.all()
        category = request.GET.get("category")
        by_user = request.query_params.get("by_user") == "true"
        qty = request.query_params.get("qty")
        # total_members = request.query_params.get("total_members") == "true"
        if by_user and not request.user.is_authenticated:
            raise AuthenticationFailed()
        if category:
            print(category)
            servers = servers.filter(category__name=category)
            print(servers)
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
            # context={"total_members": total_members,}
        ).data
        return Response(data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated:
            raise AuthenticationFailed()
        try:
            pk = int(pk)
            server = Server.objects.get(pk=pk)
            return Response(ServerSerializer(server).data, status=status.HTTP_200_OK)
        except (ValueError, Server.DoesNotExist):
            return Response({"detail": "not found"}, status=status.HTTP_404_NOT_FOUND)
