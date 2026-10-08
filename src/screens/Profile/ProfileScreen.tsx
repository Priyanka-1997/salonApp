import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bell,
  Camera,
  ChevronRight,
  Clock,
  CreditCard,
  Crown,
  Calendar,
  HelpCircle,
  Info,
  LogOut,
  MapPin,
  Settings,
  Star,
  Tag,
  User,
} from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { LucideIcon } from 'lucide-react-native';
import HomeBottomNav, { type HomeTab } from '../../components/home/HomeBottomNav';
import AppPressable from '../../components/common/AppPressable';
import { OFFERS } from '../../data/offers';
import { getSalonDetails } from '../../data/salonDetails';
import { useAppData } from '../../hooks/useAppData';
import { useAuth } from '../../hooks/useAuth';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { formatBookingDate } from '../../utils/dateFormat';
import { formatIndianMobile } from '../../utils/phone';
import { handleHomeTabChange } from '../../utils/tabNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const AVATAR_URI = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200';

type StatId = 'bookings' | 'upcoming' | 'favorites' | 'offers';

const STAT_META: { id: StatId; icon: typeof Calendar; labelKey: string }[] = [
  { id: 'bookings', icon: Calendar, labelKey: 'profile.stats.bookings' },
  { id: 'upcoming', icon: Clock, labelKey: 'profile.stats.upcoming' },
  { id: 'favorites', icon: Star, labelKey: 'profile.stats.favorites' },
  { id: 'offers', icon: Tag, labelKey: 'profile.stats.offers' },
];

type MenuItem = {
  id: string;
  icon: LucideIcon;
  labelKey: string;
  danger?: boolean;
};

const MENU: MenuItem[] = [
  { id: 'edit', icon: User, labelKey: 'profile.menu.edit' },
  { id: 'payment', icon: CreditCard, labelKey: 'profile.menu.payment' },
  { id: 'address', icon: MapPin, labelKey: 'profile.menu.address' },
  { id: 'notifications', icon: Bell, labelKey: 'profile.menu.notifications' },
  { id: 'help', icon: HelpCircle, labelKey: 'profile.menu.help' },
  { id: 'about', icon: Info, labelKey: 'profile.menu.about' },
  { id: 'logout', icon: LogOut, labelKey: 'profile.menu.logout', danger: true },
];

export default function ProfileScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout, isLoggedIn } = useAuth();
  const { bookings, favoriteIds } = useAppData();

  const upcomingCount = useMemo(
    () => bookings.filter(b => b.status === 'upcoming').length,
    [bookings],
  );
  const nextBooking = useMemo(
    () => bookings.find(b => b.status === 'upcoming'),
    [bookings],
  );
  const nextSalon = useMemo(
    () => (nextBooking ? getSalonDetails(nextBooking.salonId) : undefined),
    [nextBooking],
  );

  const statCounts: Record<StatId, number> = {
    bookings: bookings.length,
    upcoming: upcomingCount,
    favorites: favoriteIds.length,
    offers: OFFERS.length,
  };
  const displayName = user?.name ?? t('profile.defaultName');
  const phone = user?.emailOrPhone ? formatIndianMobile(user.emailOrPhone.replace(/\D/g, '').slice(-10)) : '+91 98765 43210';

  const onTabChange = (tab: HomeTab) => {
    if (tab === 'profile') {
      return;
    }
    handleHomeTabChange(navigation, tab, isLoggedIn);
  };

  const onStatPress = (id: StatId) => {
    if (id === 'bookings' || id === 'upcoming') {
      navigation.navigate('Queue');
    } else if (id === 'favorites') {
      navigation.navigate('Favorites');
    } else if (id === 'offers') {
      navigation.navigate('Offers');
    }
  };

  const onMenuPress = (id: string) => {
    if (id === 'logout') {
      logout();
      // Reset to RoleSelection (the app's root) so the user can pick a role again
      // and no screen is left as a root with a dead back button.
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'RoleSelection' }],
        }),
      );
      return;
    }
    if (id === 'edit') {
      navigation.navigate('EditProfile');
    } else if (id === 'payment') {
      navigation.navigate('PaymentMethods');
    } else if (id === 'address') {
      navigation.navigate('SavedAddresses');
    } else if (id === 'notifications') {
      navigation.navigate('Notifications');
    } else if (id === 'help') {
      navigation.navigate('HelpSupport');
    } else if (id === 'about') {
      navigation.navigate('About');
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}>
        <View style={[styles.header, { backgroundColor: colors.primary, paddingTop: insets.top + spacing.sm }]}>
          <View style={[styles.headerTop, { paddingHorizontal: spacing.lg }]}>
            <Text style={[typography.h3, { color: '#FFFFFF', fontWeight: '700' }]}>{t('profile.title')}</Text>
            <AppPressable accessibilityRole="button" hitSlop={8}>
              <Settings size={22} color="#FFFFFF" strokeWidth={2} />
            </AppPressable>
          </View>

          <View style={[styles.profileRow, { paddingHorizontal: spacing.lg, marginTop: spacing.lg }]}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: AVATAR_URI }} style={[styles.avatar, { backgroundColor: colors.border }]} />
              <View style={[styles.cameraBtn, { backgroundColor: colors.primary, borderColor: '#FFFFFF' }]}>
                <Camera size={14} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={[typography.h3, { color: '#FFFFFF', fontWeight: '700' }]}>{displayName}</Text>
              <Text style={[typography.bodySmall, { color: 'rgba(255,255,255,0.92)', marginTop: 2 }]}>{phone}</Text>
              <View style={[styles.locRow, { marginTop: 4 }]}>
                <MapPin size={12} color="rgba(255,255,255,0.9)" strokeWidth={2} />
                <Text style={[typography.caption, { color: 'rgba(255,255,255,0.9)' }]}>
                  {t('profile.location')}
                </Text>
              </View>
            </View>
            <AppPressable
              style={[
                styles.premiumBadge,
                { backgroundColor: colors.primaryDark, borderRadius: radius.md },
              ]}>
              <Crown size={16} color={colors.accent} fill={colors.accent} strokeWidth={0} />
              <Text style={[typography.caption, { color: '#FFFFFF', fontWeight: '700', marginTop: 2 }]}>
                {t('profile.premium')}
              </Text>
              <ChevronRight size={14} color="#FFFFFF" style={{ marginTop: 2 }} />
            </AppPressable>
          </View>

          <View style={{ height: spacing.xxl + spacing.md }} />
        </View>

        <View
          style={[
            styles.statsCard,
            {
              backgroundColor: colors.card,
              borderRadius: radius.md,
              marginHorizontal: spacing.lg,
              marginTop: -spacing.xxl,
              paddingVertical: spacing.md,
              borderColor: colors.border,
            },
          ]}>
          {STAT_META.map(({ id, icon: Icon, labelKey }, i) => (
            <AppPressable
              key={id}
              onPress={() => onStatPress(id)}
              style={[styles.statCell, i < STAT_META.length - 1 && styles.statBorder, { borderColor: colors.border }]}>
              <Icon size={20} color={colors.primary} strokeWidth={2} />
              <Text style={[typography.h3, { color: colors.primary, fontWeight: '700', marginTop: 4 }]}>{statCounts[id]}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center', marginTop: 2 }]}>
                {t(labelKey)}
              </Text>
            </AppPressable>
          ))}
        </View>

        {nextSalon && nextBooking ? (
          <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
              {t('profile.nextBooking')}
            </Text>
            <AppPressable
              onPress={() => navigation.navigate('BookingDetails', { bookingId: nextBooking.id })}
              style={[
                styles.nextCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: radius.md,
                  padding: spacing.md,
                },
              ]}>
              <Image
                source={{ uri: nextSalon.image }}
                style={[styles.nextThumb, { borderRadius: radius.sm, backgroundColor: colors.border }]}
              />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
                  {nextSalon.name}
                </Text>
                <View style={[styles.locRow, { marginTop: 4 }]}>
                  <MapPin size={12} color={colors.textSecondary} strokeWidth={2} />
                  <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
                    {nextSalon.address}
                  </Text>
                </View>
                <View style={[styles.locRow, { marginTop: 6, gap: 12 }]}>
                  <View style={styles.locRow}>
                    <Calendar size={12} color={colors.textSecondary} strokeWidth={2} />
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>
                      {formatBookingDate(nextBooking.dateIso)}
                    </Text>
                  </View>
                  <View style={styles.locRow}>
                    <Clock size={12} color={colors.textSecondary} strokeWidth={2} />
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>
                      {nextBooking.slotLabel}
                    </Text>
                  </View>
                </View>
                <View style={[styles.queuePill, { marginTop: spacing.sm }]}>
                  <View style={[styles.queueBadge, { backgroundColor: colors.primary + '18', borderRadius: radius.sm }]}>
                    <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
                      #{nextBooking.queueNo}
                    </Text>
                  </View>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {t('profile.queueLabel', { no: nextBooking.queueNo })}
                  </Text>
                  <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>
                    {t('profile.estWait', { min: nextSalon.waitTime })}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} strokeWidth={2} />
            </AppPressable>
          </View>
        ) : null}

        <View
          style={[
            styles.menuCard,
            {
              backgroundColor: colors.card,
              borderRadius: radius.md,
              marginHorizontal: spacing.lg,
              marginTop: spacing.lg,
              borderColor: colors.border,
            },
          ]}>
          {MENU.map((item, index) => (
            <AppPressable
              key={item.id}
              onPress={() => onMenuPress(item.id)}
              style={[
                styles.menuRow,
                index < MENU.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
              ]}>
              <item.icon
                size={20}
                color={item.danger ? colors.primaryDark : colors.primary}
                strokeWidth={2}
              />
              <Text
                style={[
                  typography.bodySmall,
                  {
                    color: item.danger ? colors.primaryDark : colors.textPrimary,
                    flex: 1,
                    marginLeft: spacing.md,
                    fontWeight: '500',
                  },
                ]}>
                {t(item.labelKey)}
              </Text>
              <ChevronRight size={18} color={colors.textSecondary} strokeWidth={2} />
            </AppPressable>
          ))}
        </View>
      </ScrollView>

      <HomeBottomNav active="profile" onChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingBottom: 0 },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  premiumBadge: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: 88,
  },
  statsCard: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statBorder: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  nextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  nextThumb: {
    width: 72,
    height: 72,
  },
  queuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  queueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  menuCard: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
