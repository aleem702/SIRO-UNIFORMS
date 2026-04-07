"""
Management command: seed_textures
Generates tileable fabric texture images using Pillow and attaches them
to the Design records in the database.
"""
import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from catalog.models import Design

try:
    from PIL import Image, ImageDraw, ImageFilter
    PILLOW_OK = True
except ImportError:
    PILLOW_OK = False


def make_denim(size=1024):
    """Dark indigo blue denim twill weave."""
    img = Image.new('RGB', (size, size), (30, 50, 110))
    draw = ImageDraw.Draw(img)
    # Twill diagonal lines
    for i in range(-size, size * 2, 6):
        draw.line([(i, 0), (i + size, size)], fill=(20, 38, 90), width=2)
    for i in range(0, size * 2, 12):
        draw.line([(i, 0), (i - size, size)], fill=(45, 65, 130), width=1)
    # Subtle horizontal weft threads
    for y in range(0, size, 4):
        draw.line([(0, y), (size, y)], fill=(35, 55, 115), width=1)
    img = img.filter(ImageFilter.SMOOTH_MORE)
    return img


def make_mesh(size=1024):
    """Light grey breathable athletic mesh."""
    img = Image.new('RGB', (size, size), (220, 222, 224))
    draw = ImageDraw.Draw(img)
    cell = 18
    for y in range(0, size, cell):
        for x in range(0, size, cell):
            # Hex-ish hole effect
            draw.ellipse([x + 3, y + 3, x + cell - 3, y + cell - 3],
                         fill=(190, 192, 195), outline=(170, 172, 175), width=1)
    img = img.filter(ImageFilter.SMOOTH)
    return img


def make_stripe(size=1024):
    """White cotton with navy blue pinstripes."""
    img = Image.new('RGB', (size, size), (245, 246, 248))
    draw = ImageDraw.Draw(img)
    stripe_spacing = 40
    stripe_width = 4
    for x in range(0, size, stripe_spacing):
        draw.rectangle([x, 0, x + stripe_width, size], fill=(25, 50, 120))
    # Fine horizontal weave texture
    for y in range(0, size, 3):
        draw.line([(0, y), (size, y)], fill=(238, 240, 242), width=1)
    img = img.filter(ImageFilter.SMOOTH_MORE)
    return img


def make_polo_knit(size=1024):
    """Khaki beige pique polo knit."""
    img = Image.new('RGB', (size, size), (188, 172, 140))
    draw = ImageDraw.Draw(img)
    cell = 14
    for y in range(0, size, cell):
        for x in range(0, size, cell):
            offset = (cell // 2) if (y // cell) % 2 == 1 else 0
            cx = x + offset
            draw.rectangle([cx + 2, y + 2, cx + cell - 2, y + cell // 2 - 1],
                           fill=(172, 158, 128), outline=(160, 146, 116), width=1)
            draw.rectangle([cx + 2, y + cell // 2 + 1, cx + cell - 2, y + cell - 2],
                           fill=(180, 165, 134), outline=(160, 146, 116), width=1)
    img = img.filter(ImageFilter.SMOOTH)
    return img


DESIGNS = [
    ('CASL-401', make_denim,    'denim_casl401.png'),
    ('SPORT-301', make_mesh,    'mesh_sport301.png'),
    ('STRP-101',  make_stripe,  'stripe_strp101.png'),
    ('UNIF-201',  make_polo_knit, 'polo_unif201.png'),
]


class Command(BaseCommand):
    help = 'Generate procedural fabric textures and attach to Design records.'

    def handle(self, *args, **options):
        if not PILLOW_OK:
            self.stderr.write('Pillow not installed. Run: pip install pillow')
            return

        for code, generator, filename in DESIGNS:
            try:
                design = Design.objects.get(code=code)
            except Design.DoesNotExist:
                self.stdout.write(f'  SKIP  {code} — not in database')
                continue

            self.stdout.write(f'  Generating texture for {code} ({filename})...')
            img = generator()

            # Save to an in-memory buffer
            import io
            buf = io.BytesIO()
            img.save(buf, format='PNG')
            buf.seek(0)

            design.texture.save(filename, ContentFile(buf.read()), save=True)
            self.stdout.write(self.style.SUCCESS(f'  OK  {code} -> media/textures/{filename}'))

        self.stdout.write(self.style.SUCCESS('\nAll textures seeded successfully.'))

        # Update design records with colors
        design_colors = {
            'CASL-401': '#1e3a8a', # deep blue
            'SPORT-301': '#64748b', # slate grey
            'STRP-101': '#ffffff', # white
            'UNIF-201': '#78350f', # warm brown
        }
        for code, color in design_colors.items():
            design = Design.objects.filter(code=code).first()
            if design:
                design.color = color
                design.save()
                self.stdout.write(f'  Updated color for {code} to {color}')
