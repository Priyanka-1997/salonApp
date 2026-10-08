import { SALONS, type Salon } from './salons';

export type SalonService = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
};

export type SalonDetails = Salon & {
  fullAddress: string;
  reviewCount: number;
  about: string;
  hours: string;
  hoursOpenLabel: string;
  gallery: string[];
  galleryTotal: number;
  services: SalonService[];
  verified: boolean;
};

const DEFAULT_SERVICES: SalonService[] = [
  { id: 's1', nameKey: 'salonDetails.services.haircut', descriptionKey: 'salonDetails.services.haircutDesc', price: 150 },
  { id: 's2', nameKey: 'salonDetails.services.beardTrim', descriptionKey: 'salonDetails.services.beardTrimDesc', price: 100 },
  { id: 's3', nameKey: 'salonDetails.services.hairWash', descriptionKey: 'salonDetails.services.hairWashDesc', price: 80 },
  { id: 's4', nameKey: 'salonDetails.services.facial', descriptionKey: 'salonDetails.services.facialDesc', price: 350 },
];

const GALLERY_POOL = [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
  'https://images.unsplash.com/photo-1585747860715-2a67f7b85993',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a',
];

function buildDetails(salon: Salon): SalonDetails {
  const idx = Number(salon.id) - 1;
  return {
    ...salon,
    fullAddress: `${salon.address}, Uttar Pradesh`,
    reviewCount: salon.id === '1' ? 230 : Math.round(salon.rating * 50),
    about:
      'Premium men\'s grooming salon offering expert haircuts, beard styling, and skin care. Walk-ins welcome.',
    hours: '10:00 AM - 10:00 PM',
    hoursOpenLabel: salon.isOpen ? 'Open Today' : 'Closed Today',
    gallery: [
      salon.image,
      GALLERY_POOL[idx % GALLERY_POOL.length],
      GALLERY_POOL[(idx + 1) % GALLERY_POOL.length],
      GALLERY_POOL[(idx + 2) % GALLERY_POOL.length],
    ],
    galleryTotal: 12,
    services: DEFAULT_SERVICES,
    verified: true,
  };
}

export function getSalonDetails(salonId: string): SalonDetails | undefined {
  const salon = SALONS.find(s => s.id === salonId);
  return salon ? buildDetails(salon) : undefined;
}
