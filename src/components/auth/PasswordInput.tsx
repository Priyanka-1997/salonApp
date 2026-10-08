import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Eye, EyeOff, Lock } from 'lucide-react-native';
import AppPressable from '../common/AppPressable';
import { useTheme } from '../../theme/useTheme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
};

export default function PasswordInput({ value, onChangeText, label, placeholder }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[typography.label, { color: colors.textPrimary, fontWeight: '700', marginBottom: spacing.xs }]}>
        {label ?? t('credentials.password')}
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
        <Lock size={18} color={colors.primary} strokeWidth={2} style={styles.lock} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? t('credentials.passwordPlaceholder')}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          style={[typography.body, styles.input, { color: colors.textPrimary }]}
        />
        <AppPressable
          accessibilityRole="button"
          onPress={() => setVisible(v => !v)}
          hitSlop={8}
          style={styles.eyeBtn}>
          {visible ? (
            <EyeOff size={20} color={colors.textSecondary} strokeWidth={2} />
          ) : (
            <Eye size={20} color={colors.textSecondary} strokeWidth={2} />
          )}
        </AppPressable>
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
    paddingRight: 8,
  },
  lock: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    includeFontPadding: false,
  },
  eyeBtn: {
    padding: 8,
  },
});
