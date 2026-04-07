from django.db import models

CATEGORY_CHOICES = [
    ('uniform', 'Uniform'),
    ('casual', 'Casual'),
    ('sportswear', 'Sportswear'),
    ('workwear', 'Workwear'),
    ('formal', 'Formal'),
]

class Design(models.Model):
    code        = models.CharField(max_length=20, unique=True)  # e.g. STRP-101
    name        = models.CharField(max_length=100)
    fabric_type = models.CharField(max_length=100)
    category    = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    thumbnail   = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    color       = models.CharField(max_length=7, default='#ffffff')  # hex color for the fabric
    texture     = models.ImageField(upload_to='textures/')     # used by 3D viewer
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} — {self.name}"

    class Meta:
        ordering = ['code']
