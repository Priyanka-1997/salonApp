import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  Award,
  Calendar,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import SalonServiceItem from '../../components/salon/SalonServiceItem';
import { getSalonDetails } from '../../data/salonDetails';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { pointerCursor } from '../../theme/interaction';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'SalonDetails'>;

type SectionId = 'about' | 'services' | 'barbers' | 'gallery' | 'reviews';

const SECTIONS: SectionId[] = ['about', 'services', 'barbers', 'gallery', 'reviews'];
const HERO_H = 280;
const { width: SCREEN_W } = Dimensions.get('window');

export default function SalonDetailsScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Partial<Record<SectionId, number>>>({});
  const [activeTab, setActiveTab] = useState<SectionId>('about');
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const { isFavorite, toggleFavorite } = useAppData();

  const salon = useMemo(() => getSalonDetails(route.params.salonId), [route.params.salonId]);
  const favorited = salon ? isFavorite(salon.id) : false;

  if (!salon) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>{t('salonDetails.notFound')}</Text>
        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }}>
          <Text style={{ color: colors.primary }}>{t('common.goBack')}</Text>
        </Pressable>
      </View>
    );
  }

  const onCall = () => {
    Linking.openURL(`tel:${salon.phone.replace(/[^+\d]/g, '')}`);
  };

  const scrollToSection = (section: SectionId) => {
    setActiveTab(section);
    const y = sectionOffsets.current[section];
    if (y != null) {
      const contentTop = HERO_H - spacing.xl + spacing.lg;
      scrollRef.current?.scrollTo({ y: contentTop + y - 12, animated: true });
    }
  };

  const markSection = (section: SectionId, y: number) => {
    sectionOffsets.current[section] = y;
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const StatCard = ({
    icon: Icon,
    value,
    label,
    subLabel,
    subColor,
    wide,
  }: {
    icon: typeof Clock;
    value: string;
    label: string;
    subLabel?: string;
    subColor?: string;
    wide?: boolean;
  }) => (
    <View
      style={[
        styles.statCard,
        {
          borderColor: colors.border,
          borderRadius: radius.md,
          minWidth: wide ? 132 : 96,
        },
      ]}>
      <View style={[styles.statIconCircle, { backgroundColor: colors.primary + '14' }]}>
        <Icon size={18} color={colors.primary} strokeWidth={2} />
      </View>
      {value ? (
        <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700', marginTop: 8 }]}>
          {value}
        </Text>
      ) : (
        <View style={{ height: 8 }} />
      )}
      <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2, textAlign: 'center' }]}>
        {label}
      </Text>
      {subLabel ? (
        <Text
          style={[
            typography.caption,
            { color: subColor ?? colors.textSecondary, fontWeight: '600', marginTop: 2 },
          ]}>
          {subLabel}
        </Text>
      ) : null}
    </View>
  );

  const SectionHeader = ({ title, showViewAll }: { title: string; showViewAll?: boolean }) => (
    <View style={[styles.sectionHeader, { marginBottom: spacing.md }]}>
      <Text style={[typography.h3, { color: colors.textPrimary }]}>{title}</Text>
      {showViewAll ? (
        <Pressable hitSlop={8}>
          <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
            {t('home.viewAll')}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 + insets.bottom }}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: salon.image }} style={[styles.heroImage, { backgroundColor: colors.border }]} />
          <View style={[styles.heroOverlay, { paddingTop: insets.top + spacing.sm }]}>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
              style={[styles.circleBtn, { backgroundColor: colors.card }]}>
              <ChevronLeft size={22} color={colors.textPrimary} strokeWidth={2.2} />
            </Pressable>
            <View style={styles.heroActions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => salon && toggleFavorite(salon.id)}
                style={[styles.circleBtn, { backgroundColor: colors.card }]}>
                <Heart
                  size={20}
                  color={favorited ? colors.primaryDark : colors.textPrimary}
                  fill={favorited ? colors.primaryDark : 'transparent'}
                  strokeWidth={2}
                />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                style={[styles.circleBtn, { backgroundColor: colors.card, marginLeft: spacing.sm }]}>
                <Share2 size={20} color={colors.textPrimary} strokeWidth={2} />
              </Pressable>
            </View>
          </View>
          <View style={styles.imageCounter}>
            <Text style={styles.counterText}>1/{salon.galleryTotal}</Text>
          </View>
        </View>

        <View
          style={[
            styles.contentCard,
            {
              backgroundColor: colors.card,
              borderTopLeftRadius: radius.lg,
              borderTopRightRadius: radius.lg,
              marginTop: -spacing.xl,
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.lg,
            },
          ]}>
          <View style={styles.titleBlock}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={[typography.h2, { color: colors.textPrimary }]}>{salon.name}</Text>
              <View style={[styles.ratingRow, { marginTop: spacing.xs }]}>
                <Star size={16} color={colors.accent} fill={colors.accent} strokeWidth={0} />
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>
                  {salon.rating.toFixed(1)}
                </Text>
                <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                  ({salon.reviewCount} {t('salonDetails.reviews')})
                </Text>
              </View>
              <View style={[styles.addrRow, { marginTop: spacing.xs }]}>
                <MapPin size={14} color={colors.textSecondary} strokeWidth={2} />
                <Text style={[typography.bodySmall, { color: colors.textSecondary, flex: 1 }]}>
                  {salon.fullAddress}
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={onCall}
              style={[
                styles.callBtn,
                { backgroundColor: colors.primary, borderRadius: radius.md, marginLeft: spacing.sm },
              ]}>
              <Phone size={18} color="#FFFFFF" strokeWidth={2} />
              <Text style={[typography.bodySmall, { color: '#FFFFFF', fontWeight: '700' }]}>
                {t('salonDetails.call')}
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.sm, paddingVertical: spacing.lg }}>
            <StatCard
              icon={Clock}
              value={`${salon.waitTime} ${t('salonDetails.min')}`}
              label={t('salonDetails.estWait')}
            />
            <StatCard icon={Users} value={String(salon.queue)} label={t('salonDetails.inQueue')} />
            <StatCard
              icon={Clock}
              value={salon.hours}
              label=""
              subLabel={salon.hoursOpenLabel}
              subColor={salon.isOpen ? colors.primary : colors.textSecondary}
              wide
            />
            {salon.verified ? (
              <StatCard icon={ShieldCheck} value="" label={t('salonDetails.verified')} />
            ) : null}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: spacing.lg }}
            contentContainerStyle={{ gap: spacing.lg }}>
            {SECTIONS.map(tab => {
              const active = activeTab === tab;
              return (
                <Pressable key={tab} accessibilityRole="tab" onPress={() => scrollToSection(tab)}>
                  <Text
                    style={[
                      typography.bodySmall,
                      {
                        color: active ? colors.primary : colors.textSecondary,
                        fontWeight: active ? '700' : '400',
                      },
                    ]}>
                    {t(`salonDetails.tabs.${tab}`)}
                  </Text>
                  {active ? (
                    <View style={[styles.tabLine, { backgroundColor: colors.primary, marginTop: 6 }]} />
                  ) : (
                    <View style={{ height: 8 }} />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>

          <View onLayout={e => markSection('about', e.nativeEvent.layout.y)}>
            <SectionHeader title={t('salonDetails.tabs.about')} />
            <View style={[styles.aboutRow, { marginBottom: spacing.xl }]}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary, flex: 1, lineHeight: 20 }]}>
                {salon.about}
              </Text>
              <View style={[styles.badge, { backgroundColor: colors.primary + '12', borderRadius: radius.md }]}>
                <Award size={30} color={colors.primary} strokeWidth={2} />
                <Text
                  style={[
                    typography.caption,
                    { color: colors.primary, fontWeight: '700', marginTop: 6, textAlign: 'center' },
                  ]}>
                  {t('salonDetails.topRated')}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>2024</Text>
              </View>
            </View>
          </View>

          <View onLayout={e => markSection('services', e.nativeEvent.layout.y)}>
            <SectionHeader title={t('salonDetails.tabs.services')} showViewAll />
            {salon.services.map(service => (
              <SalonServiceItem
                key={service.id}
                service={service}
                selected={selectedServices.has(service.id)}
                onToggle={() => toggleService(service.id)}
              />
            ))}
          </View>

          <View
            style={{ marginTop: spacing.xl }}
            onLayout={e => markSection('gallery', e.nativeEvent.layout.y)}>
            <SectionHeader title={t('salonDetails.tabs.gallery')} showViewAll />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: spacing.sm, marginBottom: spacing.lg }}>
              {salon.gallery.map((uri, i) => (
                <Image
                  key={i}
                  source={{ uri }}
                  style={[styles.galleryThumb, { borderRadius: radius.sm, backgroundColor: colors.border }]}
                />
              ))}
            </ScrollView>
          </View>

          <View onLayout={e => markSection('barbers', e.nativeEvent.layout.y)}>
            <SectionHeader title={t('salonDetails.tabs.barbers')} />
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
              {t('salonDetails.barbersSoon')}
            </Text>
          </View>

          <View onLayout={e => markSection('reviews', e.nativeEvent.layout.y)}>
            <SectionHeader title={t('salonDetails.tabs.reviews')} />
            <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
              {t('salonDetails.reviewsSoon')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: Math.max(insets.bottom, spacing.md),
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
          },
        ]}>
        <Pressable
          accessibilityRole="button"
          disabled={!salon.isOpen}
          onPress={() =>
            navigation.navigate('BookSlot', {
              salonId: salon.id,
              serviceIds: Array.from(selectedServices),
            })
          }
          style={({ pressed }) => [
            styles.bookBtn,
            pointerCursor,
            {
              backgroundColor: salon.isOpen ? colors.primary : colors.textSecondary,
              borderRadius: radius.md,
              opacity: salon.isOpen ? (pressed ? 0.92 : 1) : 0.6,
            },
          ]}>
          <Calendar size={22} color="#FFFFFF" strokeWidth={2} />
          <View style={styles.bookCopy}>
            <Text style={[typography.button, { color: '#FFFFFF' }]}>{t('home.bookSlot')}</Text>
            <Text style={[typography.caption, { color: 'rgba(255,255,255,0.85)' }]}>
              {t('salonDetails.bookSubtitle')}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroWrap: { width: SCREEN_W, height: HERO_H, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  heroActions: { flexDirection: 'row' },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 36,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  contentCard: { flex: 1 },
  titleBlock: { flexDirection: 'row', alignItems: 'flex-start' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addrRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 4 },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  statCard: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLine: { height: 2, borderRadius: 1 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aboutRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  badge: {
    width: 92,
    padding: 12,
    alignItems: 'center',
  },
  galleryThumb: {
    width: 96,
    height: 96,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  bookCopy: { alignItems: 'flex-start' },
});
