import { apiRequest } from './api';

export type BookingPayload = {
  salonId: string;
  slotStart: string;
  userId?: string;
};

export type Booking = {
  id: string;
  salonId: string;
  slotStart: string;
  status: 'booked' | 'completed' | 'cancelled';
};

export async function createBooking(payload: BookingPayload): Promise<Booking> {
  return apiRequest<Booking>('/bookings', {
    method: 'POST',
    body: payload,
  });
}

export async function cancelBooking(bookingId: string): Promise<void> {
  await apiRequest(`/bookings/${bookingId}/cancel`, { method: 'POST' });
}
