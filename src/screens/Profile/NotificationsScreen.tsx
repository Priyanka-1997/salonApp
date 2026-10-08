import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NotificationSettings } from '../../types/booking';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

const ROWS: { key: keyof NotificationSettings; labelKey: string }[] = [
  { key: 'bookingReminders', labelKey: 'notifications.bookingReminders' },
  { key: 'queueUpdates', labelKey: 'notifications.queueUpdates' },
  { key: 'offers', labelKey: 'notifications.offers' },
  { key: 'smsAlerts', labelKey: 'notifications.smsAlerts' },
];

export default function NotificationsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { notificationSettings, updateNotificationSettings } = useAppData();

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('notifications.title')} onBack={() => navigation.goBack()} />
      <Text style={[typography.bodySmall, { color: colors.textSecondary, paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        {t('notifications.subtitle')}
      </Text>
      <View
        style={[
          styles.card,
          {
            marginHorizontal: spacing.lg,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: radius.md,
          },
        ]}>
        {ROWS.map((row, i) => (
          <View
            key={row.key}
            style={[
              styles.row,
              i < ROWS.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
            ]}>
            <Text style={[typography.bodySmall, { color: colors.textPrimary, flex: 1 }]}>{t(row.labelKey)}</Text>
            <Switch
              value={notificationSettings[row.key]}
              onValueChange={v => updateNotificationSettings({ [row.key]: v })}
              trackColor={{ false: colors.border, true: colors.primary + '88' }}
              thumbColor={notificationSettings[row.key] ? colors.primary : colors.border}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: { borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden', marginBottom: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
