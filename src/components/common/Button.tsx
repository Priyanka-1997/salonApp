import type { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import AppPressable from './AppPressable';
import { useTheme } from '../../theme/useTheme';

/** Max width so primary actions don’t feel edge-to-edge on large phones; centered. */
export const BUTTON_MAX_WIDTH = 400;

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'accent';
  disabled?: boolean;
  style?: ViewStyle;
  /** Lucide icon component, e.g. `<Calendar size={20} color="..." />` */
  icon?: ReactNode;
  /** Default true: same width rules app-wide (centered, max width). Set false for inline rows (e.g. OTP Verify). */
  fullWidth?: boolean;
  /** Slightly smaller padding/height for secondary inline actions */
  size?: 'default' | 'compact';
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  icon,
  fullWidth = true,
  size = 'default',
}: Props) {
  const { colors, typography, spacing, radius } = useTheme();

  const bg =
    variant === 'primary'
      ? colors.primary
      : variant === 'accent'
        ? colors.accent
        : 'transparent';
  const borderColor = variant === 'outline' ? colors.primary : 'transparent';
  const textColor =
    variant === 'outline' ? colors.primary : variant === 'accent' ? '#FFFFFF' : '#FFFFFF';

  const padV = size === 'compact' ? spacing.sm : spacing.md;
  const padH = size === 'compact' ? spacing.md : spacing.xl;
  const minH = size === 'compact' ? 40 : 48;

  return (
    <AppPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        fullWidth ? styles.baseFullWidth : styles.baseInline,
        {
          backgroundColor: bg,
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor,
          opacity: disabled ? 0.55 : 1,
          borderRadius: radius.md,
          paddingVertical: padV,
          paddingHorizontal: padH,
          minHeight: minH,
        },
        style,
      ]}>
      {icon ? (
        <View style={styles.row}>
          {icon}
          <Text style={[typography.button, { color: textColor, flexShrink: 1 }]}>{title}</Text>
        </View>
      ) : (
        <Text style={[typography.button, { color: textColor, textAlign: 'center' }]}>{title}</Text>
      )}
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseFullWidth: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: BUTTON_MAX_WIDTH,
  },
  baseInline: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
