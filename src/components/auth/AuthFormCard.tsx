import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * White surface card that lifts form fields off the page background
 * and visually connects them to the gradient hero above.
 */
export default function AuthFormCard({ children, style }: Props) {
  const { colors, radius, spacing } = useTheme();

  const cardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  };

  return <View style={[styles.card, cardStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 3,
  },
});
