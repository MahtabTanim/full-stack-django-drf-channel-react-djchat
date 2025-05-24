from rest_framework import serializers
from .models import Server, Channel, Category
from webchat.models import Message


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    channel_server = ChannelSerializer(many=True, required=False)
    total_members = serializers.SerializerMethodField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    # icon = serializers.SerializerMethodField()

    class Meta:
        model = Server
        exclude = ["member"]

    def create(self, validated_data):
        request = self.context.get("request")
        if request:
            category_id = request.data.get("category")
            if category_id:
                try:
                    category = Category.objects.get(id=category_id)
                    validated_data["category"] = category
                except Category.DoesNotExist:
                    raise serializers.ValidationError(
                        {"category": "Invalid category ID."}
                    )
        server = super().create(validated_data)
        return server

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["category"] = CategorySerializer(instance.category).data
        return rep

    # def get_icon(self, obj):
    #     request = self.context.get("request")
    #     if obj.icon:
    #         icon_url = obj.icon.url
    #         if request is not None:
    #             return request.build_absolute_uri(icon_url)
    #         return icon_url
    #     return None

    def validate(self, data):
        """
        Custom validation to ensure required fields are not empty.
        """
        if not data.get("name"):
            raise serializers.ValidationError({"name": "This field is required."})
        if not data.get("owner"):
            raise serializers.ValidationError({"owner": "This field is required."})
        if not data.get("category"):
            raise serializers.ValidationError({"category": "This field is required."})
        return data

    def get_total_members(self, obj):
        if obj.pk:
            return obj.member.count()


class MessageSeriaLizer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ["id", "sender", "content", "timestamp"]
