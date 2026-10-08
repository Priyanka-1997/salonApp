import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import AppPressable from '../common/AppPressable';
import GoogleIcon from './GoogleIcon';
import { useTheme } from '../../theme/useTheme';

type Props = {
  onPress: () => void;
  labelKey?: string;
};

/** Outlined style; wire `@react-native-google-signin/google-signin` in onPress when ready. */
export default function GoogleSignInButton({ onPress, labelKey = 'credentials.continueWithGoogle' }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const label = t(labelKey);

  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.wrap,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
        },
      ]}>
      <View style={styles.row}>
        <GoogleIcon size={22} />
        <Text style={[typography.button, styles.label, { color: colors.textPrimary }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    maxWidth: '100%',
  },
  label: {
    flexShrink: 1,
    textAlign: 'center',
  },
});
