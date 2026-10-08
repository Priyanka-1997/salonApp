import { ChevronLeft } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppPressable from './AppPressable';
import { useTheme } from '../../theme/useTheme';

type Props = {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
};

export default function ScreenBackHeader({ title, onBack, right }: Props) {
  const { colors, typography, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.row,
        {
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.md,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}>
      <AppPressable accessibilityRole="button" onPress={onBack} style={styles.side}>
        <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2.2} />
      </AppPressable>
      <Text style={[typography.h3, { color: colors.textPrimary, flex: 1, textAlign: 'center' }]}>
        {title}
      </Text>
      <View style={styles.side}>{right ?? null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
