from django.urls import path
from .views import DesignListView, DesignDetailView

urlpatterns = [
    path('designs/', DesignListView.as_view(), name='design-list'),
    path('designs/<str:code>/', DesignDetailView.as_view(), name='design-detail'),
]
