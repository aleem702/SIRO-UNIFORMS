from rest_framework import generics
from .models import Design
from .serializers import DesignListSerializer, DesignDetailSerializer

class DesignListView(generics.ListAPIView):
    serializer_class = DesignListSerializer

    def get_queryset(self):
        qs = Design.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs

    def get_serializer_context(self):
        return {'request': self.request}

class DesignDetailView(generics.RetrieveAPIView):
    queryset = Design.objects.filter(is_active=True)
    serializer_class = DesignDetailSerializer
    lookup_field = 'code'

    def get_serializer_context(self):
        return {'request': self.request}
