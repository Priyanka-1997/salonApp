import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { images } from '../../constants/images';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { getColors } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function AboutScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('about.title')} onBack={() => navigation.goBack()} />
      <View style={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
        <View style={[styles.logoPlate, { backgroundColor: getColors('dark').background, borderRadius: radius.md }]}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>
        <Text style={[typography.h3, { color: colors.textPrimary, marginTop: spacing.md }]}>
          {t('nav.app')}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>
          {t('about.version', { version: '1.0.0' })}
        </Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.lg, lineHeight: 22 }]}>
          {t('about.description')}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xl }]}>
          {t('about.madeIn')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  logoPlate: { width: '100%', maxWidth: 360, padding: 8, alignItems: 'center', overflow: 'hidden' },
  logo: { width: '100%', aspectRatio: 2 },
});
