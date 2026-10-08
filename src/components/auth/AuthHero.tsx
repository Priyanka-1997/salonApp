import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import AppPressable from '../common/AppPressable';
import { images } from '../../constants/images';
import { useTheme } from '../../theme/useTheme';

type Props = {
  title: string;
  subtitle?: string;
  /** Optional photo rendered beneath a translucent gradient wash for extra depth. */
  photo?: number;
  /** Renders a white circular back chevron. Omit when the screen is a root (nothing to go back to). */
  onBack?: () => void;
  children?: ReactNode;
};

/**
 * Coral gradient header shared by role-selection and the auth screens.
 * The gradient is drawn with react-native-svg, so no extra native
 * dependency (e.g. linear-gradient) is required. When `photo` is set the
 * gradient turns into a translucent wash so the picture shows through
 * while keeping the white copy readable.
 */
export default function AuthHero({ title, subtitle, photo, onBack, children }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();

  const rootStyle = { backgroundColor: colors.primary };
  const contentStyle = { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xl };
  const backStyle = { marginBottom: spacing.md };
  const brandStyle = { marginBottom: spacing.lg };
  const textStyle = { gap: spacing.xs };
  const subtitleStyle = { marginTop: spacing.xs };
  // Overshoot the bottom edge: absoluteFill layers were ending ~24dp
  // early on this screen and left a raw strip at the hero's base.
  const layerStyle = { position: 'absolute' as const, left: 0, right: 0, top: 0, bottom: -64 };

  return (
    <View style={[styles.wrap, rootStyle]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {photo ? (
        <Image
          source={photo}
          style={layerStyle}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      ) : null}

      <Svg pointerEvents="none" style={layerStyle}>
        <Defs>
          <LinearGradient id="authHeroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* Hex alpha (#RRGGBBAA): stopOpacity is ignored on this
                react-native-svg build and made the wash fully opaque. */}
            <Stop offset="0%" stopColor={photo ? colors.primary + 'B8' : colors.primary} />
            <Stop offset="100%" stopColor={photo ? colors.primaryDark + 'E6' : colors.primaryDark} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#authHeroGradient)" />
      </Svg>
      <View pointerEvents="none" style={[styles.blob, styles.blobTop]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobBottom]} />

      <SafeAreaView edges={['top']} style={contentStyle}>
        {onBack ? (
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={t('common.goBack')}
            onPress={onBack}
            hitSlop={8}
            style={[styles.backBtn, backStyle]}>
            <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2.4} />
          </AppPressable>
        ) : null}

        <View style={[styles.brandRow, brandStyle]}>
          <View style={styles.brandCircle}>
            <Image
              source={images.appIcon}
              style={styles.brandIcon}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={styles.brandCopy}>
            <Text numberOfLines={1} style={[typography.h3, styles.brandName]}>
              {t('brand.line1')} {t('brand.line2')}
            </Text>
            <Text numberOfLines={1} style={[typography.caption, styles.brandTagline]}>
              {t('login.brandTagline')}
            </Text>
          </View>
        </View>

        <View style={textStyle}>
          <Text style={[typography.h1, styles.title]}>{title}</Text>
          {subtitle ? <Text style={[typography.bodySmall, styles.subtitle, subtitleStyle]}>{subtitle}</Text> : null}
        </View>

        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  blobTop: {
    width: 220,
    height: 220,
    top: -90,
    right: -60,
  },
  blobBottom: {
    width: 160,
    height: 160,
    bottom: -70,
    left: -50,
  },
  backBtn: {
    alignSelf: 'flex-start',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIcon: {
    width: 38,
    height: 38,
  },
  brandCopy: {
    flex: 1,
    minWidth: 0,
  },
  brandName: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  brandTagline: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
