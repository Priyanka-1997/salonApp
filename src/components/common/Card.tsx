import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function Card({ children, style }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: radius.md,
          padding: spacing.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});
