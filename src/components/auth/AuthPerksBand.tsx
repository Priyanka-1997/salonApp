import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CalendarCheck, ShieldCheck, Users } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { images } from '../../constants/images';
import { useTheme } from '../../theme/useTheme';

const ITEMS: { icon: LucideIcon; key: string }[] = [
  { icon: ShieldCheck, key: 'verified' },
  { icon: Users, key: 'queue' },
  { icon: CalendarCheck, key: 'booking' },
];

/**
 * Photo-backed trust band pinned to the bottom of the auth screens.
 * Fills dead space while surfacing quick value props over a dark
 * emerald wash so the white labels stay readable on any crop.
 */
export default function AuthPerksBand() {
  const { t } = useTranslation();
  const { colors, typography, radius, spacing } = useTheme();

  const bandStyle = { borderRadius: radius.lg };
  const overlayStyle = {
    backgroundColor: colors.primaryDark + 'E6',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  };

  return (
    <View style={[styles.band, bandStyle]}>
      <Image
        source={images.perksBand}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <View style={[styles.overlay, overlayStyle]}>
        <Text style={[typography.caption, styles.caption]}>{t('perks.caption')}</Text>
        <View style={styles.row}>
          {ITEMS.map(({ icon: Icon, key }) => (
            <View key={key} style={styles.cell}>
              <Icon size={18} color="#FFFFFF" strokeWidth={2} />
              <Text style={[typography.caption, styles.label]}>{t(`perks.${key}`)}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  overlay: {
    alignItems: 'center',
  },
  caption: {
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
});
