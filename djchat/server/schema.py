from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import ServerSerializer

sever_list_params = extend_schema(
    responses=ServerSerializer(many=True),
    parameters=[
        OpenApiParameter(name="category", type=OpenApiTypes.STR),
        OpenApiParameter(name="by_user", type=OpenApiTypes.BOOL),
        OpenApiParameter(name="qty", type=OpenApiTypes.INT),
    ],
)
