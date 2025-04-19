from rest_framework import serializers
from .models import Server, Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    channel_server = ChannelSerializer(many=True)
    total_members = serializers.SerializerMethodField()

    class Meta:
        model = Server
        exclude = [
            "member",
        ]
        # fields = [
        #     "id",
        #     "name",
        #     "category",
        #     "description",
        #     "channel_server",
        #     "total_members",
        # ]

    def get_total_members(self, obj):
        return obj.member.count()

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     total_members = self.context.get("total_members")
    #     if not total_members:
    #         data.pop("total_members", None)
    #     return data
