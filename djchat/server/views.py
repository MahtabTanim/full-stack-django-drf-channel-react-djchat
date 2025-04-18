from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Server
from .serializers import ServerSerializer


# Create your views here.


class ServerListViewSet(ViewSet):

    def list(self, request):
        servers = Server.objects.all()
        category = request.GET.get("category")
        if category:
            print(category)
            servers = servers.filter(category__name=category)
        data = ServerSerializer(servers, many=True).data
        return Response(data, status=status.HTTP_200_OK)
