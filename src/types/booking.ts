export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  salonId: string;
  slotLabel: string;
  dateIso: string;
  phone: string;
  serviceIds: string[];
  amount: number;
  queueNo: number;
  status: BookingStatus;
  createdAt: string;
};

export type SavedAddress = {
  id: string;
  label: string;
  line1: string;
  city: string;
  pincode: string;
  isDefault: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'upi' | 'card';
  label: string;
  detail: string;
  isDefault: boolean;
};

export type NotificationSettings = {
  bookingReminders: boolean;
  queueUpdates: boolean;
  offers: boolean;
  smsAlerts: boolean;
};
