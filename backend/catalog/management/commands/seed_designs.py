from django.core.management.base import BaseCommand
from catalog.models import Design

class Command(BaseCommand):
    help = 'Seed initial designs for FabricOS'

    def handle(self, *args, **kwargs):
        designs = [
            {
                'code': 'STRP-101',
                'name': 'Oxford Blue Stripe',
                'fabric_type': '100% Cotton Oxford',
                'category': 'formal',
                'description': 'A classic blue striped oxford fabric, perfect for executive uniforms.'
            },
            {
                'code': 'UNIF-201',
                'name': 'Durable Polo Knit',
                'fabric_type': 'Poly-Cotton Blend',
                'category': 'uniform',
                'description': 'Resilient and breathable knit fabric designed for everyday workwear.'
            },
            {
                'code': 'SPORT-301',
                'name': 'Aero-Mesh Pro',
                'fabric_type': 'Recycled Polyester',
                'category': 'sportswear',
                'description': 'Technical mesh with moisture-wicking properties for high-performance athletic apparel.'
            },
            {
                'code': 'CASL-401',
                'name': 'Raw Indigo Denim',
                'fabric_type': '12oz Selvedge Denim',
                'category': 'casual',
                'description': 'Premium selvedge denim for high-end casual wear collections.'
            }
        ]

        for d in designs:
            Design.objects.get_or_create(code=d['code'], defaults=d)
            self.stdout.write(self.style.SUCCESS(f"Seeded {d['code']}"))
