import type { SalonDetails } from '../data/salonDetails';

export function resolveBookingServices(salon: SalonDetails, serviceIds: string[]) {
  const selected =
    serviceIds.length > 0
      ? salon.services.filter(s => serviceIds.includes(s.id))
      : salon.services.slice(0, 2);
  const amount = selected.reduce((sum, s) => sum + s.price, 0);
  return { services: selected, amount };
}
