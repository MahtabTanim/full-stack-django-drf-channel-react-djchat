from .models import User
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer

# Create your views here.


class UserListViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        try:
            user_id = self.request.query_params.get("user_id")
            if not user_id:
                return User.objects.all()
        except User.DoesNotExist:
            return []
