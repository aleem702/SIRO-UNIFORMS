from rest_framework import serializers
from .models import Design

class DesignListSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    texture_url   = serializers.SerializerMethodField()

    class Meta:
        model = Design
        fields = ['id', 'code', 'name', 'fabric_type', 'category', 'thumbnail_url', 'color', 'texture_url']

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail and request:
            return request.build_absolute_uri(obj.thumbnail.url)
        return None

    def get_texture_url(self, obj):
        request = self.context.get('request')
        if obj.texture and request:
            return request.build_absolute_uri(obj.texture.url)
        return None

class DesignDetailSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    texture_url   = serializers.SerializerMethodField()

    class Meta:
        model = Design
        fields = ['id', 'code', 'name', 'fabric_type', 'category',
                  'description', 'thumbnail_url', 'color', 'texture_url']

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail and request:
            return request.build_absolute_uri(obj.thumbnail.url)
        return None

    def get_texture_url(self, obj):
        request = self.context.get('request')
        if obj.texture and request:
            return request.build_absolute_uri(obj.texture.url)
        return None
