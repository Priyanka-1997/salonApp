import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  titleKey: string;
  subtitleKey: string;
};

/** Brand + screen title + subtitle — shared by Login and Signup for consistent spacing. */
export default function AuthScreenHeader({ titleKey, subtitleKey }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text
        style={[
          typography.h1,
          styles.noFontPadding,
          { color: colors.textPrimary, textAlign: 'center', marginBottom: spacing.md },
        ]}>
        {t('brand.line1')}{' '}
        <Text style={{ color: colors.primary, fontWeight: '800' }}>{t('brand.line2')}</Text>
      </Text>
      <View style={{ gap: spacing.xs }}>
        <Text style={[typography.h2, styles.noFontPadding, { color: colors.textPrimary }]}>
          {t(titleKey)}
        </Text>
        <Text style={[typography.bodySmall, styles.noFontPadding, { color: colors.textSecondary }]}>
          {t(subtitleKey)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noFontPadding: {
    includeFontPadding: false,
  },
});
