from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Server, Category
from .serializers import ServerSerializer, CategorySerializer
from rest_framework.exceptions import AuthenticationFailed
from . import schema

# Create your views here.


class ServerListViewSet(ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

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
            # context={"total_members": total_members,}
        ).data
        return Response(data, status=status.HTTP_200_OK)

    # def create(self, request, *args, **kwargs):
    #     serializer = ServerSerializer(data=request.data)
    #     if serializer.is_valid():
    #         server = Server.objects.create(**serializer.validated_data)
    #         return Response(
    #             ServerSerializer(server).data, status=status.HTTP_201_CREATED
    #         )
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
