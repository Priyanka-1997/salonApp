import { Clock, MapPin } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { formatWaitMinutes } from '../../utils/helpers';

type Props = {
  name: string;
  address: string;
  waitMinutes?: number;
  onPress: () => void;
};

export default function SalonCard({ name, address, waitMinutes, onPress }: Props) {
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: colors.card,
          borderRadius: radius.md,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          padding: spacing.lg,
          opacity: pressed ? 0.92 : 1,
        },
      ]}>
      <View style={{ flex: 1 }}>
        <Text style={[typography.h3, { color: colors.textPrimary }]}>{name}</Text>
        <View style={[styles.addrRow, { marginTop: spacing.xs }]}>
          <MapPin size={14} color={colors.textSecondary} strokeWidth={2} />
          <Text style={[typography.bodySmall, { color: colors.textSecondary, flex: 1 }]}>
            {address}
          </Text>
        </View>
      </View>
      {waitMinutes != null && (
        <View style={[styles.badge, { backgroundColor: colors.primary + '22' }]}>
          <Clock size={12} color={colors.primary} strokeWidth={2} />
          <Text style={[typography.caption, { color: colors.primary }]}>
            ~{formatWaitMinutes(waitMinutes)}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  addrRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
});
