import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Percent, X } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

export default function PromoBanner() {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.primary + '18',
          borderRadius: radius.md,
          padding: spacing.md,
          marginTop: spacing.md,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('home.dismissPromo')}
        onPress={() => setVisible(false)}
        style={styles.closeBtn}
        hitSlop={8}>
        <X size={16} color={colors.textSecondary} strokeWidth={2} />
      </Pressable>

      <View style={styles.row}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
          <Percent size={20} color="#FFFFFF" strokeWidth={2.5} />
        </View>
        <View style={styles.copy}>
          <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
            {t('home.promoTitle')}
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
            {t('home.promoSubtitle')}
          </Text>
        </View>
        <View style={[styles.code, { borderColor: colors.primary, borderRadius: radius.sm }]}>
          <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
            {t('home.promoCode')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  code: {
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
