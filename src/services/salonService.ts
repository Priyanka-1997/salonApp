import { SALONS, type Salon } from '../data/salons';
import { apiRequest } from './api';

export type SalonSummary = Pick<
  Salon,
  'id' | 'name' | 'address' | 'rating' | 'distance' | 'waitTime' | 'queue' | 'isOpen' | 'image'
> & {
  /** @deprecated use waitTime */
  waitMinutes?: number;
};

export type { Salon };

/** Replace with real endpoints when backend exists */
export async function fetchSalons(): Promise<Salon[]> {
  try {
    return await apiRequest<Salon[]>('/salons');
  } catch {
    return SALONS;
  }
}

export async function fetchSalonById(id: string): Promise<Salon | undefined> {
  const list = await fetchSalons();
  return list.find(s => s.id === id);
}
