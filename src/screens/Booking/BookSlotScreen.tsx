import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Calendar,
  ChevronLeft,
  Clock,
  Info,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  Users,
} from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSalonDetails } from '../../data/salonDetails';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { pointerCursor } from '../../theme/interaction';
import { useTheme } from '../../theme/useTheme';
import {
  buildDateOptions,
  buildTimeSlots,
  firstAvailableSlot,
  slotsByPeriod,
  type DateOption,
  type SlotPeriod,
  type TimeSlot,
} from '../../utils/timeSlots';

type Props = NativeStackScreenProps<RootStackParamList, 'BookSlot'>;

const { width: SCREEN_W } = Dimensions.get('window');
const SLOT_COLS = 4;
const SLOT_GAP = 8;

const PERIODS: { id: SlotPeriod; icon: typeof Sun; hintKey?: string }[] = [
  { id: 'morning', icon: Clock, hintKey: 'bookSlot.opensAt' },
  { id: 'afternoon', icon: Sun },
  { id: 'evening', icon: Moon },
];

export default function BookSlotScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();

  const salon = useMemo(() => getSalonDetails(route.params.salonId), [route.params.salonId]);
  const dates = useMemo(() => buildDateOptions(), []);
  const [selectedDate, setSelectedDate] = useState<DateOption>(dates[0]);

  const slots = useMemo(() => buildTimeSlots(selectedDate), [selectedDate]);
  const defaultSlot = useMemo(() => firstAvailableSlot(slots), [slots]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const activeSlot = useMemo(() => {
    if (selectedSlotId) {
      return slots.find(s => s.id === selectedSlotId && s.available);
    }
    return defaultSlot;
  }, [selectedSlotId, slots, defaultSlot]);

  if (!salon) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>{t('salonDetails.notFound')}</Text>
        <Pressable onPress={() => navigation.goBack()} style={[pointerCursor, { marginTop: spacing.md }]}>
          <Text style={{ color: colors.primary }}>{t('common.goBack')}</Text>
        </Pressable>
      </View>
    );
  }

  const onCall = () => Linking.openURL(`tel:${salon.phone.replace(/[^+\d]/g, '')}`);

  const onInfo = () => {
    Alert.alert(salon.name, `${salon.hours}\n${salon.fullAddress}`, [{ text: t('common.ok') }]);
  };

  const onConfirm = () => {
    if (!activeSlot) {
      return;
    }
    navigation.navigate('CustomerLogin', {
      salonId: route.params.salonId,
      slotLabel: activeSlot.label,
      dateIso: selectedDate.id,
      serviceIds: route.params.serviceIds ?? [],
    });
  };

  const slotWidth = (SCREEN_W - spacing.lg * 2 - SLOT_GAP * (SLOT_COLS - 1)) / SLOT_COLS;

  const renderSlot = (slot: TimeSlot) => {
    const selected = activeSlot?.id === slot.id;
    const disabled = !slot.available;

    return (
      <Pressable
        key={slot.id}
        accessibilityRole="button"
        accessibilityState={{ selected, disabled }}
        disabled={disabled}
        onPress={() => setSelectedSlotId(slot.id)}
        style={({ pressed }) => [
          styles.slotChip,
          pointerCursor,
          {
            width: slotWidth,
            borderRadius: radius.sm,
            borderColor: selected ? colors.primary : disabled ? colors.border : colors.primary,
            backgroundColor: selected ? colors.primary : disabled ? colors.border + '55' : colors.card,
            opacity: disabled ? 0.45 : pressed ? 0.9 : 1,
          },
        ]}>
        <Text
          style={[
            typography.caption,
            {
              color: selected ? '#FFFFFF' : disabled ? colors.textSecondary : colors.primary,
              fontWeight: selected ? '700' : '500',
              textAlign: 'center',
            },
          ]}>
          {slot.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing.sm,
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.md,
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.headerSide, pointerCursor, { opacity: pressed ? 0.7 : 1 }]}>
          <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[typography.h3, { color: colors.textPrimary }]}>{t('bookSlot.title')}</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
            {salon.name}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onInfo}
          style={({ pressed }) => [styles.headerSide, styles.infoBtn, pointerCursor, { opacity: pressed ? 0.7 : 1 }]}>
          <Info size={18} color={colors.primary} strokeWidth={2} />
          <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>
            {t('bookSlot.info')}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: spacing.lg,
          paddingBottom: 200 + insets.bottom,
        }}>
        <View
          style={[
            styles.salonCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.md,
              padding: spacing.md,
            },
          ]}>
          <View style={styles.salonTop}>
            <Image
              source={{ uri: salon.image }}
              style={[styles.thumb, { borderRadius: radius.sm, backgroundColor: colors.border }]}
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
                {salon.name}
              </Text>
              <View style={[styles.ratingRow, { marginTop: 4 }]}>
                <Star size={14} color={colors.accent} fill={colors.accent} strokeWidth={0} />
                <Text style={[typography.caption, { color: colors.textPrimary, fontWeight: '600' }]}>
                  {salon.rating.toFixed(1)}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  ({salon.reviewCount} {t('salonDetails.reviews')})
                </Text>
              </View>
              <View style={[styles.addrRow, { marginTop: 4 }]}>
                <MapPin size={12} color={colors.textSecondary} strokeWidth={2} />
                <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
                  {salon.address}
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={onCall}
              style={({ pressed }) => [
                styles.callOutline,
                pointerCursor,
                {
                  borderColor: colors.primary,
                  borderRadius: radius.sm,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <Phone size={14} color={colors.primary} strokeWidth={2} />
              <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
                {t('salonDetails.call')}
              </Text>
            </Pressable>
          </View>

          <View style={[styles.statsRow, { borderTopColor: colors.border, marginTop: spacing.md, paddingTop: spacing.md }]}>
            <Stat icon={Clock} value={`${salon.waitTime} ${t('salonDetails.min')}`} label={t('salonDetails.estWait')} colors={colors} />
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <Stat icon={Users} value={String(salon.queue)} label={t('salonDetails.inQueue')} colors={colors} />
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <Stat icon={ShieldCheck} value="" label={t('salonDetails.verified')} colors={colors} wide />
          </View>
        </View>

        <View style={[styles.dateHeader, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          <Calendar size={18} color={colors.textPrimary} strokeWidth={2} />
          <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>
            {t('bookSlot.selectDate')}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.sm, marginBottom: spacing.lg }}>
          {dates.map(d => {
            const selected = selectedDate.id === d.id;
            return (
              <Pressable
                key={d.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => {
                  setSelectedDate(d);
                  setSelectedSlotId(null);
                }}
                style={({ pressed }) => [
                  styles.dateChip,
                  pointerCursor,
                  {
                    borderRadius: radius.md,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : colors.card,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}>
                <Text
                  style={[
                    typography.caption,
                    { color: selected ? '#FFFFFF' : colors.textSecondary, fontWeight: '600' },
                  ]}>
                  {d.isToday ? t('bookSlot.today') : d.dayLabel}
                </Text>
                <Text
                  style={[
                    typography.h3,
                    {
                      color: selected ? '#FFFFFF' : colors.textPrimary,
                      marginVertical: 2,
                    },
                  ]}>
                  {d.dateNum}
                </Text>
                <Text
                  style={[
                    typography.caption,
                    { color: selected ? 'rgba(255,255,255,0.9)' : colors.textSecondary },
                  ]}>
                  {d.weekday}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {PERIODS.map(({ id, icon: Icon, hintKey }) => {
          const periodSlots = slotsByPeriod(slots, id);
          if (periodSlots.length === 0) {
            return null;
          }
          return (
            <View key={id} style={{ marginBottom: spacing.lg }}>
              <View style={styles.periodHeader}>
                <Icon size={18} color={colors.textPrimary} strokeWidth={2} />
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
                  {t(`bookSlot.period.${id}`)}
                </Text>
              </View>
              {hintKey ? (
                <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.sm }]}>
                  {t(hintKey)}
                </Text>
              ) : null}
              <View style={styles.slotGrid}>{periodSlots.map(renderSlot)}</View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: Math.max(insets.bottom, spacing.md),
          },
        ]}>
        <View style={[styles.summaryRow, { paddingHorizontal: spacing.lg, paddingTop: spacing.md }]}>
          <SummaryItem
            label={t('bookSlot.selectedTime')}
            value={activeSlot?.label ?? '—'}
            colors={colors}
            typography={typography}
          />
          <SummaryItem
            label={t('salonDetails.estWait')}
            value={`${salon.waitTime} ${t('salonDetails.min')}`}
            colors={colors}
            typography={typography}
          />
          <SummaryItem
            label={t('bookSlot.queueNo')}
            value={`#${salon.queue}`}
            colors={colors}
            typography={typography}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={!activeSlot}
          onPress={onConfirm}
          style={({ pressed }) => [
            styles.confirmBtn,
            pointerCursor,
            {
              backgroundColor: activeSlot ? colors.primary : colors.textSecondary,
              borderRadius: radius.md,
              marginHorizontal: spacing.lg,
              marginTop: spacing.md,
              opacity: activeSlot ? (pressed ? 0.92 : 1) : 0.55,
            },
          ]}>
          <Text style={[typography.button, { color: '#FFFFFF' }]}>{t('bookSlot.confirm')}</Text>
          <Text style={[typography.caption, { color: 'rgba(255,255,255,0.88)', marginTop: 2 }]}>
            {t('bookSlot.cancelAnytime')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  colors,
  wide,
}: {
  icon: typeof Clock;
  value: string;
  label: string;
  colors: ReturnType<typeof useTheme>['colors'];
  wide?: boolean;
}) {
  return (
    <View style={[styles.stat, wide ? { flex: 1.2 } : { flex: 1 }]}>
      <Icon size={16} color={colors.primary} strokeWidth={2} />
      {value ? (
        <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginTop: 4 }}>
          {value}
        </Text>
      ) : null}
      <Text style={{ fontSize: 11, color: colors.textSecondary, marginTop: 2, textAlign: 'center' }}>
        {label}
      </Text>
    </View>
  );
}

function SummaryItem({
  label,
  value,
  colors,
  typography,
}: {
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>['colors'];
  typography: ReturnType<typeof useTheme>['typography'];
}) {
  return (
    <View style={styles.summaryItem}>
      <Text style={[typography.caption, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700', marginTop: 2 }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerSide: {
    width: 56,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  infoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  salonCard: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  salonTop: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  thumb: {
    width: 72,
    height: 72,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addrRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  callOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  stat: { alignItems: 'center' },
  statDivider: { width: StyleSheet.hairlineWidth, height: 36, marginHorizontal: 8 },
  dateHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateChip: {
    width: 64,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotChip: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 1.5,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  confirmBtn: {
    alignItems: 'center',
    paddingVertical: 14,
  },
});
