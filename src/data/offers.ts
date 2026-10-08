export type Offer = {
  id: string;
  titleKey: string;
  descKey: string;
  code: string;
  discount: string;
  validUntil: string;
  salonId?: string;
};

export const OFFERS: Offer[] = [
  {
    id: '1',
    titleKey: 'offers.items.first.title',
    descKey: 'offers.items.first.desc',
    code: 'BOOKNOW20',
    discount: '20%',
    validUntil: '2026-12-31',
  },
  {
    id: '2',
    titleKey: 'offers.items.weekend.title',
    descKey: 'offers.items.weekend.desc',
    code: 'WEEKEND15',
    discount: '15%',
    validUntil: '2026-08-31',
    salonId: '1',
  },
  {
    id: '3',
    titleKey: 'offers.items.referral.title',
    descKey: 'offers.items.referral.desc',
    code: 'REFER100',
    discount: '₹100',
    validUntil: '2026-06-30',
  },
];
