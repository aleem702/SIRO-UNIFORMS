---
name: django-backend-pro
description: Patterns for building clean, resilient Django REST APIs and data persistence for high-end commerce.
---

# Django Backend Excellence

## Goal
Develop resilient, high-performance backends for catalog manipulation, 3D file management, and order processing.

## Guidelines

### 1. Robust API Architectures
- **Django REST Framework (DRF)**: Use Class-based Views (CBVs) or ViewSets for clean, consistent resource management.
- **Serializers**: Use `ModelSerializer` and keep complex logic out of serializers—move it to service layers if possible.
- **Pagination**: Implement cursor-based pagination for large garment catalogs.

### 2. Performance & Optimization
- **Select Related & Prefetch Related**: Use these to avoid "N+1" queries in the product catalog.
- **Database Indexing**: Ensure `barcode`, `sku`, and `product_id` are indexed.
- **Middleware**: Minimize heavy processing in middleware.

### 3. Media & Files
- **S3 Management**: Prepare models for S3/Cloudfront for high-volume 3D model and texture loading.
- **Thumbnail Generation**: Automatically generate 2D thumbnails for 3D products as they are uploaded.
- **Texture Versioning**: Use hashing for texture file names to ensure cache invalidation.

### 4. Admin Customization
- **Admin Actions**: Build custom Django Admin actions for bulk-updating garment prices or categories.
- **Search & Filters**: Ensure the Admin interface is highly searchable for material codes.

## Usage
- When building `catalog` API endpoints.
- For managing fabric and material distributions.
- To architect the backend for scale.
