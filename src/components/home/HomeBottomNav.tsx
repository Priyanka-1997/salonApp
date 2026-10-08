import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, Heart, Home, Tag, User } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppPressable from '../common/AppPressable';
import { useTheme } from '../../theme/useTheme';

export type HomeTab = 'home' | 'bookings' | 'favorites' | 'offers' | 'profile';

type Tab = {
  id: HomeTab;
  labelKey: string;
  Icon: LucideIcon;
};

const TABS: Tab[] = [
  { id: 'home', labelKey: 'home.tabs.home', Icon: Home },
  { id: 'bookings', labelKey: 'home.tabs.bookings', Icon: Calendar },
  { id: 'favorites', labelKey: 'home.tabs.favorites', Icon: Heart },
  { id: 'offers', labelKey: 'home.tabs.offers', Icon: Tag },
  { id: 'profile', labelKey: 'home.tabs.profile', Icon: User },
];

type Props = {
  active: HomeTab;
  onChange: (tab: HomeTab) => void;
};

export default function HomeBottomNav({ active, onChange }: Props) {
  const { t } = useTranslation();
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}>
      {TABS.map(({ id, labelKey, Icon }) => {
        const selected = active === id;
        const tint = selected ? colors.primary : colors.textSecondary;
        return (
          <AppPressable
            key={id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(id)}
            style={styles.tab}>
            <Icon size={20} color={tint} strokeWidth={selected ? 2.4 : 2} />
            <Text
              style={[
                typography.caption,
                {
                  color: tint,
                  fontWeight: selected ? '600' : '400',
                  marginTop: 2,
                  fontSize: 10,
                },
              ]}
              numberOfLines={1}>
              {t(labelKey)}
            </Text>
          </AppPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});
