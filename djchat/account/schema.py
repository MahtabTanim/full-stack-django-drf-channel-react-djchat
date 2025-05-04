from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import UserSerializer

user_list_params = extend_schema(
    responses=UserSerializer(many=False),
    parameters=[
        OpenApiParameter(name="user_id", type=OpenApiTypes.INT),
    ],
)
