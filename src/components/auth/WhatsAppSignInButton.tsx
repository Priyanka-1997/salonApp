import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import AppPressable from '../common/AppPressable';
import { useTheme } from '../../theme/useTheme';

type Props = {
  onPress: () => void;
  labelKey?: string;
};

export default function WhatsAppSignInButton({ onPress, labelKey = 'login.whatsapp' }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <AppPressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.wrap,
        {
          borderColor: colors.primary,
          backgroundColor: colors.card,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          marginBottom: spacing.sm,
        },
      ]}>
      <View style={styles.row}>
        <MessageCircle size={22} color="#25D366" fill="#25D366" strokeWidth={0} />
        <Text style={[typography.button, { color: colors.primary }]}>{t(labelKey)}</Text>
      </View>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
