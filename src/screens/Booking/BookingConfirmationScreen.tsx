import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import {
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowRight,
  Bell,
  Calendar,
  Clock,
  Home,
  IndianRupee,
  MapPin,
  Phone,
  Share2,
  ShoppingBag,
  Smartphone,
  Timer,
  Users,
} from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookingSuccessHero from '../../components/booking/BookingSuccessHero';
import AppPressable from '../../components/common/AppPressable';
import Button from '../../components/common/Button';
import { getSalonDetails } from '../../data/salonDetails';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { resolveBookingServices } from '../../utils/bookingServices';
import { formatBookingDate } from '../../utils/dateFormat';
import { formatIndianMobile } from '../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmation'>;

export default function BookingConfirmationScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const { salonId, slotLabel, dateIso, phone, serviceIds, bookingId } = route.params;

  const salon = useMemo(() => getSalonDetails(salonId), [salonId]);
  const { services: bookedServices, amount } = useMemo(
    () => (salon ? resolveBookingServices(salon, serviceIds) : { services: [], amount: 0 }),
    [salon, serviceIds],
  );
  const serviceLabels = bookedServices.map(s => t(s.nameKey));
  const queueNo = salon ? Math.max(1, salon.queue - 1) : 2;
  const peopleAhead = Math.max(0, queueNo - 1);
  const dateLabel = formatBookingDate(dateIso);
  const formattedPhone = formatIndianMobile(phone);

  if (!salon) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>{t('salonDetails.notFound')}</Text>
      </View>
    );
  }

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  const onCall = () => Linking.openURL(`tel:${salon.phone.replace(/[^+\d]/g, '')}`);

  const onShare = async () => {
    try {
      await Share.share({
        message: t('bookingConfirmation.shareMessage', {
          salon: salon.name,
          date: dateLabel,
          time: slotLabel,
        }),
      });
    } catch {
      /* user cancelled */
    }
  };

  const DetailCell = ({
    icon: Icon,
    label,
    value,
    sub,
    action,
  }: {
    icon: typeof Calendar;
    label: string;
    value: string;
    sub?: string;
    action?: { text: string; onPress: () => void };
  }) => (
    <View style={[styles.detailCell, { borderColor: colors.border }]}>
      <Icon size={18} color={colors.primary} strokeWidth={2} />
      <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 6 }]}>{label}</Text>
      <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700', marginTop: 2 }]}>
        {value}
      </Text>
      {sub ? (
        <Text style={[typography.caption, { color: colors.primary, marginTop: 2, fontWeight: '600' }]}>{sub}</Text>
      ) : null}
      {action ? (
        <AppPressable onPress={action.onPress} hitSlop={8} style={{ marginTop: 4 }}>
          <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>
            {action.text} →
          </Text>
        </AppPressable>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: insets.top + spacing.md,
          paddingBottom: spacing.xxl + insets.bottom,
        }}>
        <BookingSuccessHero />

        <Text style={[typography.h2, { color: colors.textPrimary, textAlign: 'center' }]}>
          {t('bookingConfirmation.title')}
        </Text>
        <Text
          style={[
            typography.bodySmall,
            { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.lg },
          ]}>
          {t('bookingConfirmation.subtitle')}
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.md,
              padding: spacing.md,
            },
          ]}>
          <View style={styles.salonRow}>
            <Image
              source={{ uri: salon.image }}
              style={[styles.thumb, { borderRadius: radius.sm, backgroundColor: colors.border }]}
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
                {salon.name}
              </Text>
              <View style={[styles.inline, { marginTop: 4 }]}>
                <MapPin size={12} color={colors.textSecondary} strokeWidth={2} />
                <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
                  {salon.address}
                </Text>
              </View>
              <View style={[styles.inline, { marginTop: 4 }]}>
                <Phone size={12} color={colors.primary} strokeWidth={2} />
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{formattedPhone}</Text>
              </View>
            </View>
            <AppPressable
              onPress={onCall}
              style={[
                styles.callBtn,
                { borderColor: colors.primary, borderRadius: radius.sm },
              ]}>
              <Phone size={14} color={colors.primary} strokeWidth={2} />
              <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
                {t('salonDetails.call')}
              </Text>
            </AppPressable>
          </View>

          <View style={[styles.grid, { marginTop: spacing.md }]}>
            <DetailCell icon={Calendar} label={t('bookingConfirmation.date')} value={dateLabel} />
            <DetailCell icon={Clock} label={t('bookingConfirmation.time')} value={slotLabel} />
            <DetailCell
              icon={ShoppingBag}
              label={t('bookingConfirmation.services')}
              value={serviceLabels.join(', ')}
              action={{
                text: t('bookingConfirmation.viewDetails'),
                onPress: () =>
                  navigation.navigate('BookingDetails', { bookingId }),
              }}
            />
            <DetailCell
              icon={IndianRupee}
              label={t('bookingConfirmation.amount')}
              value={`₹${amount}`}
              sub={t('bookingConfirmation.paidOnline')}
            />
          </View>

          <View style={[styles.queueRow, { borderTopColor: colors.border, marginTop: spacing.md, paddingTop: spacing.md }]}>
            <View style={styles.queueCell}>
              <Users size={18} color={colors.primary} strokeWidth={2} />
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>
                {t('bookingConfirmation.queueNo')}
              </Text>
              <Text style={[typography.h3, { color: colors.primary, fontWeight: '700' }]}>#{queueNo}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
                {t('bookingConfirmation.peopleAhead', { count: peopleAhead })}
              </Text>
            </View>
            <View style={[styles.queueDivider, { backgroundColor: colors.border }]} />
            <View style={styles.queueCell}>
              <Timer size={18} color={colors.primary} strokeWidth={2} />
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>
                {t('bookingConfirmation.waitingTime')}
              </Text>
              <Text style={[typography.h3, { color: colors.primary, fontWeight: '700' }]}>
                {salon.waitTime} {t('salonDetails.min')}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
                {t('bookingConfirmation.thanksPatience')}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.reminder,
            {
              backgroundColor: colors.primary + '12',
              borderRadius: radius.md,
              padding: spacing.md,
              marginTop: spacing.lg,
            },
          ]}>
          <View style={[styles.bellCircle, { backgroundColor: colors.primary + '22' }]}>
            <Bell size={20} color={colors.primary} strokeWidth={2} />
          </View>
          <Text style={[typography.bodySmall, { color: colors.textPrimary, flex: 1, lineHeight: 20 }]}>
            <Text style={{ fontWeight: '700' }}>{t('bookingConfirmation.remindTitle')}</Text>{' '}
            {t('bookingConfirmation.remindBody')}
          </Text>
          <Smartphone size={36} color={colors.primary} strokeWidth={1.5} />
        </View>

        <Button
          title={t('bookingConfirmation.viewBooking')}
          onPress={() => navigation.navigate('BookingDetails', { bookingId })}
          icon={<Calendar size={20} color="#FFFFFF" strokeWidth={2} />}
          style={{ marginTop: spacing.xl }}
        />
        <AppPressable
          onPress={goHome}
          style={[
            styles.outlineBtn,
            {
              borderColor: colors.primary,
              borderRadius: radius.md,
              marginTop: spacing.md,
            },
          ]}>
          <Home size={20} color={colors.primary} strokeWidth={2} />
          <Text style={[typography.button, { color: colors.primary, flex: 1, textAlign: 'center' }]}>
            {t('bookingConfirmation.backHome')}
          </Text>
          <ArrowRight size={20} color={colors.primary} strokeWidth={2} style={{ opacity: 0 }} />
        </AppPressable>

        <View style={[styles.shareRow, { marginTop: spacing.xl }]}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>
              {t('bookingConfirmation.shareTitle')}
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
              {t('bookingConfirmation.shareSubtitle')}
            </Text>
          </View>
          <View style={styles.shareIcons}>
            <AppPressable
              onPress={onShare}
              style={[styles.shareBtn, { backgroundColor: '#25D366' + '22' }]}>
              <Share2 size={18} color="#25D366" strokeWidth={2} />
            </AppPressable>
            <AppPressable
              onPress={onShare}
              style={[styles.shareBtn, { backgroundColor: '#1877F2' + '22' }]}>
              <Share2 size={18} color="#1877F2" strokeWidth={2} />
            </AppPressable>
            <AppPressable onPress={onShare} style={[styles.shareBtn, { backgroundColor: colors.border }]}>
              <Share2 size={18} color={colors.textSecondary} strokeWidth={2} />
            </AppPressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  salonRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  thumb: { width: 64, height: 64 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailCell: {
    width: '48%',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
  },
  queueRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  queueCell: { flex: 1, alignItems: 'center' },
  queueDivider: { width: StyleSheet.hairlineWidth, marginHorizontal: 8 },
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    gap: 10,
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shareIcons: { flexDirection: 'row', gap: 8 },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
