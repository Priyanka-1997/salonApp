import { User } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  position: number;
  title: string;
  subtitle?: string;
};

export default function QueueItem({ position, title, subtitle }: Props) {
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: colors.card,
          borderRadius: radius.md,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          padding: spacing.md,
        },
      ]}>
      <View style={[styles.index, { backgroundColor: colors.primary }]}>
        <Text style={[typography.label, { color: '#FFFFFF' }]}>{position}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <View style={styles.titleRow}>
          <User size={16} color={colors.textSecondary} strokeWidth={2} />
          <Text style={[typography.body, { color: colors.textPrimary, flex: 1 }]}>{title}</Text>
        </View>
        {subtitle ? (
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  index: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
