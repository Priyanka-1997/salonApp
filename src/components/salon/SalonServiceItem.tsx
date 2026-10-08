import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Plus, Scissors, Sparkles, UserRound, Wind } from 'lucide-react-native';
import type { SalonService } from '../../data/salonDetails';
import { pointerCursor } from '../../theme/interaction';
import { useTheme } from '../../theme/useTheme';

type Props = {
  service: SalonService;
  selected?: boolean;
  onToggle?: () => void;
};

function ServiceIconBox({ serviceId }: { serviceId: string }) {
  const { colors } = useTheme();
  const bg = colors.primary + '14';
  const tint = colors.primary;
  const size = 22;

  let Icon = Scissors;
  if (serviceId === 's2') {
    Icon = UserRound;
  } else if (serviceId === 's3') {
    Icon = Wind;
  } else if (serviceId === 's4') {
    Icon = Sparkles;
  }

  return (
    <View style={[styles.iconBox, { backgroundColor: bg }]}>
      <Icon size={size} color={tint} strokeWidth={2} />
    </View>
  );
}

export default function SalonServiceItem({ service, selected, onToggle }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
          marginBottom: spacing.sm,
        },
      ]}>
      <ServiceIconBox serviceId={service.id} />
      <View style={styles.copy}>
        <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
          {t(service.nameKey)}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
          {t(service.descriptionKey)}
        </Text>
      </View>
      <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
        ₹{service.price}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onToggle}
        style={[
          styles.addBtn,
          pointerCursor,
          {
            backgroundColor: selected ? colors.primary : colors.card,
            borderColor: colors.primary,
            borderRadius: radius.sm,
          },
        ]}>
        <Plus
          size={18}
          color={selected ? '#FFFFFF' : colors.primary}
          strokeWidth={2.5}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  addBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
