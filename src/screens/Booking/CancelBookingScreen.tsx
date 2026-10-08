import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../components/common/Button';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { getSalonDetails } from '../../data/salonDetails';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { formatBookingDate } from '../../utils/dateFormat';

type Props = NativeStackScreenProps<RootStackParamList, 'CancelBooking'>;

export default function CancelBookingScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { getBooking, cancelBooking } = useAppData();
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

  const onConfirm = () => {
    cancelBooking(booking.id);
    Alert.alert(t('cancelBooking.successTitle'), t('cancelBooking.successMessage'), [
      {
        text: t('common.ok'),
        onPress: () => navigation.navigate('Queue'),
      },
    ]);
  };

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('cancelBooking.title')} onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, lineHeight: 22, marginBottom: spacing.lg }]}>
          {t('cancelBooking.subtitle')}
        </Text>
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
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>
              {formatBookingDate(booking.dateIso)} · {booking.slotLabel}
            </Text>
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '600', marginTop: 4 }]}>
              {t('bookingConfirmation.queueNo')}: #{booking.queueNo}
            </Text>
          </View>
        </View>
        <Button title={t('cancelBooking.confirm')} onPress={onConfirm} />
        <Button title={t('common.goBack')} onPress={() => navigation.goBack()} variant="outline" style={{ marginTop: spacing.sm }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { flexDirection: 'row', gap: 12, borderWidth: StyleSheet.hairlineWidth, marginBottom: 20 },
  thumb: { width: 64, height: 64 },
});
