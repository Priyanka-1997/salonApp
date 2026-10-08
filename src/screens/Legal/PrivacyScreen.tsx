import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Privacy'>;

const SECTIONS = ['intro', 'data', 'sharing', 'rights'] as const;

export default function PrivacyScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('legal.privacyTitle')} onBack={() => navigation.goBack()} />
      <Text style={[typography.caption, { color: colors.textSecondary, paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        {t('legal.lastUpdated')}
      </Text>
      {SECTIONS.map(key => (
        <Text
          key={key}
          style={[
            typography.bodySmall,
            { color: colors.textPrimary, paddingHorizontal: spacing.lg, marginBottom: spacing.lg, lineHeight: 22 },
          ]}>
          {t(`legal.privacy.${key}`)}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
