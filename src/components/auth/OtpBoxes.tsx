import { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AppPressable from '../common/AppPressable';
import { useTheme } from '../../theme/useTheme';

const OTP_LEN = 6;

type Props = {
  value: string;
  onChange: (code: string) => void;
};

export default function OtpBoxes({ value, onChange }: Props) {
  const { colors, typography, spacing, radius } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const digits = value.padEnd(OTP_LEN, ' ').split('').slice(0, OTP_LEN);
  const focusIndex = Math.min(value.length, OTP_LEN - 1);

  return (
    <View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={text => onChange(text.replace(/\D/g, '').slice(0, OTP_LEN))}
        keyboardType="number-pad"
        maxLength={OTP_LEN}
        autoFocus
        caretHidden
        style={styles.hiddenInput}
        accessibilityLabel="OTP input"
      />
      <View style={[styles.row, { gap: spacing.sm }]}>
        {digits.map((ch, i) => {
          const filled = ch.trim().length > 0;
          const focused = i === focusIndex && value.length < OTP_LEN;
          return (
            <AppPressable
              key={i}
              accessibilityRole="button"
              onPress={() => inputRef.current?.focus()}
              style={[
                styles.box,
                {
                  borderRadius: radius.md,
                  borderColor: focused || filled ? colors.primary : colors.border,
                  backgroundColor: colors.card,
                  borderWidth: focused ? 2 : 1.5,
                },
              ]}>
              <Text
                style={[
                  typography.h3,
                  {
                    color: filled ? colors.textPrimary : colors.placeholder,
                    textAlign: 'center',
                  },
                ]}>
                {filled ? ch : '—'}
              </Text>
            </AppPressable>
          );
        })}
      </View>
    </View>
  );
}

export const OTP_LENGTH = OTP_LEN;

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: 46,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
