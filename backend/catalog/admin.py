from django.contrib import admin
from .models import Design

@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display  = ['code', 'name', 'fabric_type', 'category', 'is_active']
    list_filter   = ['category', 'is_active']
    search_fields = ['code', 'name']
    readonly_fields = ['created_at']
