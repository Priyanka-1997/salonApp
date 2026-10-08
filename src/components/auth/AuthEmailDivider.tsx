import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  /** i18n key for center label, e.g. `signup.dividerOr` */
  labelKey?: string;
};

export default function AuthEmailDivider({ labelKey = 'credentials.orWithEmail' }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.row, { marginVertical: spacing.md }]}>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      <Text style={[typography.caption, { color: colors.textSecondary, marginHorizontal: spacing.md }]}>
        {t(labelKey)}
      </Text>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
});
