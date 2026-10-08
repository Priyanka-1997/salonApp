import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'number-pad';
  secureTextEntry?: boolean;
  /** Glass fields on gradient auth screens */
  tone?: 'default' | 'glass';
  editable?: boolean;
  /** Tighter bottom spacing (e.g. inline OTP + button row) */
  denseBottom?: boolean;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
};

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry,
  tone = 'default',
  editable = true,
  denseBottom = false,
  maxLength,
  autoCapitalize,
  autoCorrect,
}: Props) {
  const { colors, typography, spacing, radius } = useTheme();

  const isGlass = tone === 'glass';
  const fg = isGlass ? '#FFFFFF' : colors.textPrimary;
  const ph = isGlass ? 'rgba(255,255,255,0.72)' : colors.placeholder;
  const border = isGlass ? 'rgba(255,255,255,0.38)' : colors.border;
  const bg = isGlass ? 'rgba(255,255,255,0.18)' : colors.card;
  const labelColor = isGlass ? 'rgba(255,255,255,0.88)' : colors.textSecondary;

  return (
    <View style={{ marginBottom: denseBottom ? 0 : spacing.lg }}>
      {label ? (
        <Text style={[typography.label, { color: labelColor, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={ph}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        style={[
          typography.body,
          styles.input,
          {
            color: fg,
            borderColor: border,
            backgroundColor: bg,
            borderRadius: isGlass ? radius.full : radius.md,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            opacity: editable ? 1 : 0.55,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
