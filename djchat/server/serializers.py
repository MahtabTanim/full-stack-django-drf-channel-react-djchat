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
    channel_server = ChannelSerializer(many=True)
    total_members = serializers.SerializerMethodField()
    category = CategorySerializer()

    class Meta:
        model = Server
        exclude = [
            "member",
        ]

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

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     total_members = self.context.get("total_members")
    #     if not total_members:
    #         data.pop("total_members", None)
    #     return data


class MessageSeriaLizer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ["id", "sender", "content", "timestamp"]
