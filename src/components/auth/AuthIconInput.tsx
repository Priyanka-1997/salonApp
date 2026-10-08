import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: LucideIcon;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'words' | 'sentences';
};

export default function AuthIconInput({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  keyboardType = 'default',
  autoCapitalize,
}: Props) {
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[typography.label, { color: colors.textPrimary, fontWeight: '700', marginBottom: spacing.xs }]}>
        {label}
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
        <Icon size={18} color={colors.primary} strokeWidth={2} style={styles.icon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
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
    minHeight: 48,
  },
  icon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 12,
    includeFontPadding: false,
  },
});
