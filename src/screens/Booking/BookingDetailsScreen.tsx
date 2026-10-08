import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar, Clock, IndianRupee, MapPin, Users } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../components/common/Button';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { getSalonDetails } from '../../data/salonDetails';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { formatBookingDate } from '../../utils/dateFormat';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingDetails'>;

export default function BookingDetailsScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { getBooking } = useAppData();
  const booking = getBooking(route.params.bookingId);

  const salon = useMemo(
    () => (booking ? getSalonDetails(booking.salonId) : undefined),
    [booking],
  );

  if (!booking || !salon) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>{t('bookings.notFound')}</Text>
      </View>
    );
  }

  const serviceNames = booking.serviceIds
    .map(id => salon.services.find(s => s.id === id))
    .filter(Boolean)
    .map(s => t(s!.nameKey))
    .join(', ');

  const statusColor =
    booking.status === 'cancelled' ? colors.primaryDark : booking.status === 'completed' ? colors.textSecondary : colors.primary;

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('bookings.detailsTitle')} onBack={() => navigation.goBack()} />

      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
          ]}>
          <Image
            source={{ uri: salon.image }}
            style={[styles.thumb, { borderRadius: radius.sm, backgroundColor: colors.border }]}
          />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>{salon.name}</Text>
            <View style={styles.row}>
              <MapPin size={12} color={colors.textSecondary} />
              <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
                {salon.address}
              </Text>
            </View>
            <Text style={[typography.caption, { color: statusColor, fontWeight: '700', marginTop: 6 }]}>
              {t(`bookings.status.${booking.status}`)}
            </Text>
          </View>
        </View>

        <DetailRow icon={Calendar} label={t('bookingConfirmation.date')} value={formatBookingDate(booking.dateIso)} colors={colors} typography={typography} />
        <DetailRow icon={Clock} label={t('bookingConfirmation.time')} value={booking.slotLabel} colors={colors} typography={typography} />
        <DetailRow icon={Users} label={t('bookingConfirmation.queueNo')} value={`#${booking.queueNo}`} colors={colors} typography={typography} />
        <DetailRow icon={IndianRupee} label={t('bookingConfirmation.amount')} value={`₹${booking.amount}`} colors={colors} typography={typography} />
        {serviceNames ? (
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.sm }]}>
            {t('bookingConfirmation.services')}: {serviceNames}
          </Text>
        ) : null}

        <Button
          title={t('salonDetails.call')}
          onPress={() => Linking.openURL(`tel:${salon.phone.replace(/[^+\d]/g, '')}`)}
          style={{ marginTop: spacing.lg }}
        />

        {booking.status === 'upcoming' ? (
          <Button
            title={t('bookings.cancel')}
            onPress={() => navigation.navigate('CancelBooking', { bookingId: booking.id })}
            style={{ marginTop: spacing.sm }}
            variant="outline"
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  colors,
  typography,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>['colors'];
  typography: ReturnType<typeof useTheme>['typography'];
}) {
  return (
    <View style={styles.detailRow}>
      <Icon size={16} color={colors.primary} strokeWidth={2} />
      <Text style={[typography.caption, { color: colors.textSecondary, width: 90 }]}>{label}</Text>
      <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600', flex: 1 }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { flexDirection: 'row', gap: 12, borderWidth: StyleSheet.hairlineWidth, marginBottom: 16 },
  thumb: { width: 72, height: 72 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
});
