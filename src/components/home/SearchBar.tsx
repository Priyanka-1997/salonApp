import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: colors.card,
          borderRadius: radius.md,
          borderColor: colors.border,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          marginBottom: spacing.lg,
        },
      ]}>
      <Search size={20} color={colors.textSecondary} strokeWidth={2} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t('home.searchPlaceholder')}
        placeholderTextColor={colors.placeholder}
        style={[typography.body, styles.input, { color: colors.textPrimary }]}
        returnKeyType="search"
      />
      <SlidersHorizontal size={20} color={colors.textSecondary} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    includeFontPadding: false,
  },
});
