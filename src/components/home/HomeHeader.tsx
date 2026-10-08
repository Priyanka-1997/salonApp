import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Bell, ChevronDown, MapPin } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  location?: string;
  notificationCount?: number;
};

export default function HomeHeader({ location = 'Greater Noida', notificationCount = 3 }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.locationBtn, { opacity: pressed ? 0.75 : 1 }]}>
          <MapPin size={18} color={colors.primary} strokeWidth={2.2} fill={colors.primary + '22'} />
          <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>
            {location}
          </Text>
          <ChevronDown size={16} color={colors.textSecondary} strokeWidth={2} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.bellBtn, { opacity: pressed ? 0.75 : 1 }]}>
          <Bell size={22} color={colors.textPrimary} strokeWidth={2} />
          {notificationCount > 0 ? (
            <View style={[styles.badge, { backgroundColor: colors.primaryDark }]}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <Text style={[typography.h2, { color: colors.textPrimary, marginTop: spacing.md }]}>
        {t('home.greeting')}
      </Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {t('home.greetingSubtitle')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bellBtn: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
