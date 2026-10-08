import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { images } from '../../constants/images';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { getColors } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SPLASH_MS = __DEV__ ? 30000 : 2200;
const COLORS = getColors('dark');

export default function SplashScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { spacing, typography } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, SPLASH_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Svg pointerEvents="none" style={StyleSheet.absoluteFill} viewBox="0 0 400 860" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="splashTopRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.accent} />
            <Stop offset="46%" stopColor={COLORS.primary} />
            <Stop offset="100%" stopColor={COLORS.primaryDark} />
          </LinearGradient>
          <LinearGradient id="splashBottomRibbon" x1="100%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.primaryDark} />
            <Stop offset="55%" stopColor={COLORS.primary} />
            <Stop offset="100%" stopColor={COLORS.accent} />
          </LinearGradient>
        </Defs>
        <Path d="M0 0H190C156 30 163 55 121 75 77 96 36 105 0 146V0Z" fill={COLORS.primaryDark} />
        <Path d="M0 0H157C133 25 143 44 108 62 68 83 29 87 0 123V0Z" fill="url(#splashTopRibbon)" />
        <Path d="M0 0H105C90 20 99 35 73 49 43 66 18 76 0 99V0Z" fill={COLORS.primary} opacity={0.8} />
        <Path d="M400 610C350 661 316 686 267 699 209 714 180 747 143 860H400V610Z" fill={COLORS.primaryDark} />
        <Path d="M400 655C355 699 322 720 278 735 229 751 207 782 177 860H400V655Z" fill="url(#splashBottomRibbon)" />
        <Path d="M400 724C370 753 341 771 310 785 281 799 265 824 248 860H400V724Z" fill={COLORS.primary} opacity={0.88} />
      </Svg>

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <Image
            source={images.appIcon}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel={t('nav.app')}
            accessibilityIgnoresInvertColors
          />
          <View style={styles.wordmark}>
            <Text style={[typography.h1, styles.bookLine]}>
              B<Text style={{ color: COLORS.primary }}>OO</Text>K
            </Text>
            <Text style={[typography.h3, styles.salonLine]}>MY SALON</Text>
          </View>
          <Text style={[typography.bodySmall, styles.tagline, { marginTop: spacing.md }]}>
            {t('splash.tagline1')} {t('splash.tagline2')}
          </Text>
        </View>

        <View style={[styles.progressDots, { paddingBottom: spacing.lg }]} accessibilityLabel={t('splash.loading')}>
          <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
          <View style={[styles.dot, { backgroundColor: COLORS.accent }]} />
          <View style={[styles.dot, { backgroundColor: COLORS.border }]} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -26,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: -12,
  },
  wordmark: {
    alignItems: 'center',
  },
  bookLine: {
    color: '#FFFFFF',
    fontSize: 50,
    lineHeight: 56,
    textAlign: 'center',
  },
  salonLine: {
    color: COLORS.primary,
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
  },
  tagline: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});