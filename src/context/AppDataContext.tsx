import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Booking, NotificationSettings, PaymentMethod, SavedAddress } from '../types/booking';

type AppDataContextValue = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'> & { status?: Booking['status'] }) => Booking;
  cancelBooking: (id: string) => void;
  getBooking: (id: string) => Booking | undefined;
  favoriteIds: string[];
  toggleFavorite: (salonId: string) => void;
  isFavorite: (salonId: string) => boolean;
  addresses: SavedAddress[];
  paymentMethods: PaymentMethod[];
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (patch: Partial<NotificationSettings>) => void;
  updateAddress: (id: string, patch: Partial<SavedAddress>) => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  setDefaultPayment: (id: string) => void;
};

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'b-seed-1',
    salonId: '1',
    slotLabel: '04:30 PM',
    dateIso: new Date().toISOString().slice(0, 10),
    phone: '9876543210',
    serviceIds: ['s1', 's2'],
    amount: 250,
    queueNo: 2,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  },
];

const SEED_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    line1: 'Sector 62, Greater Noida',
    city: 'Greater Noida, UP',
    pincode: '201309',
    isDefault: true,
  },
];

const SEED_PAYMENTS: PaymentMethod[] = [
  { id: 'pay-1', type: 'upi', label: 'UPI', detail: 'rahul@upi', isDefault: true },
  { id: 'pay-2', type: 'card', label: 'Debit Card', detail: '•••• 4532', isDefault: false },
];

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  bookingReminders: true,
  queueUpdates: true,
  offers: true,
  smsAlerts: false,
};

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '3']);
  const [addresses, setAddresses] = useState<SavedAddress[]>(SEED_ADDRESSES);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(SEED_PAYMENTS);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(DEFAULT_NOTIFICATIONS);

  const addBooking = useCallback(
    (input: Omit<Booking, 'id' | 'createdAt' | 'status'> & { status?: Booking['status'] }): Booking => {
      const booking: Booking = {
        ...input,
        id: newId('b'),
        status: input.status ?? 'upcoming',
        createdAt: new Date().toISOString(),
      };
      setBookings(prev => [booking, ...prev]);
      return booking;
    },
    [],
  );

  const cancelBooking = useCallback((id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'cancelled' as const } : b)),
    );
  }, []);

  const getBooking = useCallback((id: string) => bookings.find(b => b.id === id), [bookings]);

  const toggleFavorite = useCallback((salonId: string) => {
    setFavoriteIds(prev =>
      prev.includes(salonId) ? prev.filter(id => id !== salonId) : [...prev, salonId],
    );
  }, []);

  const isFavorite = useCallback(
    (salonId: string) => favoriteIds.includes(salonId),
    [favoriteIds],
  );

  const updateNotificationSettings = useCallback((patch: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...patch }));
  }, []);

  const updateAddress = useCallback((id: string, patch: Partial<SavedAddress>) => {
    setAddresses(prev => prev.map(a => (a.id === id ? { ...a, ...patch } : a)));
  }, []);

  const addAddress = useCallback((address: Omit<SavedAddress, 'id'>) => {
    setAddresses(prev => [...prev, { ...address, id: newId('addr') }]);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  }, []);

  const setDefaultPayment = useCallback((id: string) => {
    setPaymentMethods(prev => prev.map(p => ({ ...p, isDefault: p.id === id })));
  }, []);

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      cancelBooking,
      getBooking,
      favoriteIds,
      toggleFavorite,
      isFavorite,
      addresses,
      paymentMethods,
      notificationSettings,
      updateNotificationSettings,
      updateAddress,
      addAddress,
      removeAddress,
      setDefaultAddress,
      setDefaultPayment,
    }),
    [
      bookings,
      addBooking,
      cancelBooking,
      getBooking,
      favoriteIds,
      toggleFavorite,
      isFavorite,
      addresses,
      paymentMethods,
      notificationSettings,
      updateNotificationSettings,
      updateAddress,
      addAddress,
      removeAddress,
      setDefaultAddress,
      setDefaultPayment,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataContextValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return ctx;
}
