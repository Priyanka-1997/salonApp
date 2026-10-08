import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ChevronDown, Phone } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  showPhoneIcon?: boolean;
  label?: string;
};

export default function PhoneCountryInput({ value, onChangeText, showPhoneIcon, label }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[typography.label, { color: colors.textPrimary, fontWeight: '700', marginBottom: spacing.xs }]}>
        {label ?? t('phoneLogin.mobile')}
      </Text>
      <View
        style={[
          styles.row,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderRadius: radius.md,
          },
        ]}>
        <View style={styles.codeWrap}>
          <Text style={[typography.body, { color: colors.textPrimary, fontWeight: '600' }]}>+91</Text>
          <ChevronDown size={14} color={colors.textSecondary} strokeWidth={2} />
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        {showPhoneIcon ? <Phone size={18} color={colors.primary} strokeWidth={2} style={{ marginRight: 8 }} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t('login.mobilePlaceholder')}
          placeholderTextColor={colors.placeholder}
          keyboardType="phone-pad"
          maxLength={10}
          style={[typography.body, styles.input, { color: colors.textPrimary }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  codeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 10,
  },
  divider: {
    width: 1,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    includeFontPadding: false,
  },
});
