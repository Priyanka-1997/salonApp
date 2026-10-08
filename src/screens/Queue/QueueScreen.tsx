import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar, ChevronRight, Clock, Users } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../components/common/AppPressable';
import TabScreenShell from '../../components/common/TabScreenShell';
import QueueItem from '../../components/salon/QueueItem';
import { getSalonDetails } from '../../data/salonDetails';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { Booking } from '../../types/booking';
import { useTheme } from '../../theme/useTheme';
import { formatBookingDate } from '../../utils/dateFormat';

type Props = NativeStackScreenProps<RootStackParamList, 'Queue'>;

type Tab = 'upcoming' | 'past';

const DEMO_QUEUE = [
  { position: 1, title: 'Online — 10:00', subtitle: 'Booked' },
  { position: 2, title: 'Online — 10:15', subtitle: 'Booked' },
  { position: 3, title: 'Walk-in', subtitle: 'Offline' },
];

export default function QueueScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { bookings } = useAppData();
  const [tab, setTab] = useState<Tab>('upcoming');

  const upcoming = useMemo(
    () => bookings.filter(b => b.status === 'upcoming'),
    [bookings],
  );
  const past = useMemo(
    () => bookings.filter(b => b.status !== 'upcoming'),
    [bookings],
  );
  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <TabScreenShell active="bookings" navigation={navigation}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
        <Users size={26} color={colors.primary} strokeWidth={2} />
        <Text style={[typography.h2, { color: colors.textPrimary, flex: 1 }]}>{t('bookings.title')}</Text>
      </View>
      <Text style={[typography.bodySmall, { color: colors.textSecondary, paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        {t('bookings.subtitle')}
      </Text>

      <View style={[styles.tabs, { paddingHorizontal: spacing.lg, marginBottom: spacing.md, gap: spacing.sm }]}>
        {(['upcoming', 'past'] as Tab[]).map(id => {
          const active = tab === id;
          return (
            <AppPressable
              key={id}
              onPress={() => setTab(id)}
              style={[
                styles.tabChip,
                {
                  borderRadius: radius.md,
                  backgroundColor: active ? colors.primary : colors.card,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}>
              <Text
                style={[
                  typography.caption,
                  { color: active ? '#FFFFFF' : colors.textSecondary, fontWeight: '700' },
                ]}>
                {t(`bookings.tabs.${id}`)}
              </Text>
            </AppPressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.md }}
        showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }]}>
            {t(`bookings.empty.${tab}`)}
          </Text>
        ) : (
          list.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
            />
          ))
        )}

        {tab === 'upcoming' && upcoming.length > 0 ? (
          <View style={{ marginTop: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
              {t('queue.liveTitle')}
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.sm }]}>
              {t('queue.hint')}
            </Text>
            {DEMO_QUEUE.map(row => (
              <QueueItem key={row.position} position={row.position} title={row.title} subtitle={row.subtitle} />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </TabScreenShell>
  );
}

function BookingCard({ booking, onPress }: { booking: Booking; onPress: () => void }) {
  const { t } = useTranslation();
  const { colors, typography, radius, spacing } = useTheme();
  const salon = getSalonDetails(booking.salonId);
  if (!salon) {
    return null;
  }

  const statusColor =
    booking.status === 'cancelled' ? colors.primaryDark : booking.status === 'completed' ? colors.textSecondary : colors.primary;

  return (
    <AppPressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
        },
      ]}>
      <Image
        source={{ uri: salon.image }}
        style={[styles.thumb, { borderRadius: radius.sm, backgroundColor: colors.border }]}
      />
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>{salon.name}</Text>
        <View style={styles.metaRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {formatBookingDate(booking.dateIso)}
          </Text>
          <Clock size={12} color={colors.textSecondary} />
          <Text style={[typography.caption, { color: colors.textSecondary }]}>{booking.slotLabel}</Text>
        </View>
        <Text style={[typography.caption, { color: statusColor, fontWeight: '600', marginTop: 4 }]}>
          {t(`bookings.status.${booking.status}`)} · #{booking.queueNo}
        </Text>
      </View>
      <ChevronRight size={18} color={colors.textSecondary} />
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  tabs: { flexDirection: 'row' },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: StyleSheet.hairlineWidth },
  thumb: { width: 56, height: 56 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' },
});
