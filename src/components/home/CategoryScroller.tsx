import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Flower2, Palette, Scissors, Sparkles, UserRound } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

type Category = {
  id: string;
  labelKey: string;
  Icon: LucideIcon;
};

const CATEGORIES: Category[] = [
  { id: 'haircut', labelKey: 'home.categories.haircut', Icon: Scissors },
  { id: 'beard', labelKey: 'home.categories.beard', Icon: UserRound },
  { id: 'facial', labelKey: 'home.categories.facial', Icon: Sparkles },
  { id: 'hairColor', labelKey: 'home.categories.hairColor', Icon: Palette },
  { id: 'spa', labelKey: 'home.categories.spa', Icon: Flower2 },
];

type Props = {
  onSelect?: (id: string) => void;
};

export default function CategoryScroller({ onSelect }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const [active, setActive] = useState('haircut');

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={[styles.titleRow, { marginBottom: spacing.md }]}>
        <Text style={[typography.h3, { color: colors.textPrimary }]}>{t('home.categoriesTitle')}</Text>
        <Pressable accessibilityRole="button" hitSlop={8}>
          <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
            {t('home.viewAll')}
          </Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {CATEGORIES.map(({ id, labelKey, Icon }) => {
          const selected = active === id;
          return (
            <Pressable
              key={id}
              accessibilityRole="button"
              onPress={() => {
                setActive(id);
                onSelect?.(id);
              }}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.card : colors.background,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.md,
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.md,
                  minWidth: 76,
                },
              ]}>
              <Icon
                size={22}
                color={selected ? colors.primary : colors.textSecondary}
                strokeWidth={2}
              />
              <Text
                style={[
                  typography.caption,
                  {
                    color: selected ? colors.primary : colors.textSecondary,
                    fontWeight: selected ? '600' : '400',
                    marginTop: spacing.xs,
                  },
                ]}>
                {t(labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    alignItems: 'center',
    borderWidth: 1.5,
  },
});
