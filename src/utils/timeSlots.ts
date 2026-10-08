export type SlotPeriod = 'morning' | 'afternoon' | 'evening';

export type TimeSlot = {
  id: string;
  label: string;
  period: SlotPeriod;
  /** Minutes from midnight */
  minutes: number;
  available: boolean;
};

export type DateOption = {
  id: string;
  dayLabel: string;
  dateNum: number;
  weekday: string;
  isToday: boolean;
  date: Date;
};

const SLOT_DEFS: { label: string; period: SlotPeriod; minutes: number }[] = [
  { label: '10:00 AM', period: 'morning', minutes: 10 * 60 },
  { label: '10:30 AM', period: 'morning', minutes: 10 * 60 + 30 },
  { label: '11:00 AM', period: 'morning', minutes: 11 * 60 },
  { label: '11:30 AM', period: 'morning', minutes: 11 * 60 + 30 },
  { label: '12:00 PM', period: 'afternoon', minutes: 12 * 60 },
  { label: '12:30 PM', period: 'afternoon', minutes: 12 * 60 + 30 },
  { label: '01:00 PM', period: 'afternoon', minutes: 13 * 60 },
  { label: '01:30 PM', period: 'afternoon', minutes: 13 * 60 + 30 },
  { label: '02:00 PM', period: 'afternoon', minutes: 14 * 60 },
  { label: '02:30 PM', period: 'afternoon', minutes: 14 * 60 + 30 },
  { label: '03:00 PM', period: 'afternoon', minutes: 15 * 60 },
  { label: '03:30 PM', period: 'afternoon', minutes: 15 * 60 + 30 },
  { label: '04:00 PM', period: 'afternoon', minutes: 16 * 60 },
  { label: '04:30 PM', period: 'afternoon', minutes: 16 * 60 + 30 },
  { label: '05:00 PM', period: 'afternoon', minutes: 17 * 60 },
  { label: '05:30 PM', period: 'afternoon', minutes: 17 * 60 + 30 },
  { label: '06:00 PM', period: 'evening', minutes: 18 * 60 },
  { label: '06:30 PM', period: 'evening', minutes: 18 * 60 + 30 },
  { label: '07:00 PM', period: 'evening', minutes: 19 * 60 },
  { label: '07:30 PM', period: 'evening', minutes: 19 * 60 + 30 },
  { label: '08:00 PM', period: 'evening', minutes: 20 * 60 },
  { label: '08:30 PM', period: 'evening', minutes: 20 * 60 + 30 },
  { label: '09:00 PM', period: 'evening', minutes: 21 * 60 },
  { label: '09:30 PM', period: 'evening', minutes: 21 * 60 + 30 },
];

/** Hard-coded unavailable slots (demo — booked out) */
const BOOKED_OUT = new Set(['01:00 PM', '09:00 PM']);

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function buildDateOptions(count = 7): DateOption[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const options: DateOption[] = [];

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    options.push({
      id: d.toISOString().slice(0, 10),
      dayLabel: i === 0 ? 'Today' : WEEKDAYS[d.getDay()],
      dateNum: d.getDate(),
      weekday: WEEKDAYS[d.getDay()],
      isToday: i === 0,
      date: d,
    });
  }
  return options;
}

export function buildTimeSlots(selectedDate: DateOption): TimeSlot[] {
  const now = new Date();
  const isToday = selectedDate.isToday;

  return SLOT_DEFS.map(def => {
    const past =
      isToday && def.minutes <= now.getHours() * 60 + now.getMinutes() + 15;
    const booked = BOOKED_OUT.has(def.label);
    return {
      id: `${selectedDate.id}-${def.label}`,
      label: def.label,
      period: def.period,
      minutes: def.minutes,
      available: !past && !booked,
    };
  });
}

export function firstAvailableSlot(slots: TimeSlot[]): TimeSlot | undefined {
  return slots.find(s => s.available);
}

export function slotsByPeriod(slots: TimeSlot[], period: SlotPeriod): TimeSlot[] {
  return slots.filter(s => s.period === period);
}
