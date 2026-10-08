import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Clock, MapPin, Star, Users } from 'lucide-react-native';
import Button from '../common/Button';
import type { Salon } from '../../data/salons';
import { pointerCursor } from '../../theme/interaction';
import { useTheme } from '../../theme/useTheme';

type Props = {
  salon: Salon;
  onBook: () => void;
  onPress?: () => void;
};

export default function SalonListCard({ salon, onBook, onPress }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: radius.md,
          borderColor: colors.border,
          padding: spacing.md,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        disabled={!onPress}
        style={({ pressed }) => [pointerCursor, { opacity: pressed && onPress ? 0.96 : 1 }]}>
      <View style={styles.row}>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: salon.image }}
            style={[styles.image, { borderRadius: radius.sm, backgroundColor: colors.border }]}
          />
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: salon.isOpen ? colors.primary : colors.textSecondary,
                borderRadius: radius.sm,
              },
            ]}>
            <Text style={styles.statusText}>
              {salon.isOpen ? t('home.open') : t('home.closed')}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={[typography.h3, { color: colors.textPrimary, flex: 1 }]} numberOfLines={1}>
              {salon.name}
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>{salon.distance}</Text>
          </View>

          <View style={[styles.ratingRow, { marginTop: spacing.xs }]}>
            <Star size={14} color={colors.accent} fill={colors.accent} strokeWidth={0} />
            <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>
              {salon.rating.toFixed(1)}
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              ({Math.round(salon.rating * 28)})
            </Text>
          </View>

          <View style={[styles.addrRow, { marginTop: spacing.xs }]}>
            <MapPin size={12} color={colors.textSecondary} strokeWidth={2} />
            <Text style={[typography.caption, { color: colors.textSecondary, flex: 1 }]} numberOfLines={1}>
              {salon.address}
            </Text>
          </View>

          <View style={[styles.metaRow, { marginTop: spacing.sm }]}>
            <View style={styles.metaItem}>
              <Clock size={12} color={colors.textSecondary} strokeWidth={2} />
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {salon.waitTime} {t('home.minWait')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Users size={12} color={colors.textSecondary} strokeWidth={2} />
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {salon.queue} {t('home.inQueue')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      </Pressable>

      <Button
        title={t('home.bookSlot')}
        onPress={onBook}
        disabled={!salon.isOpen}
        style={{ marginTop: spacing.md, width: '100%', maxWidth: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  imageWrap: {
    width: 108,
    height: 108,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
