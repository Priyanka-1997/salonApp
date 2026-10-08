import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Copy, Tag } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../components/common/AppPressable';
import TabScreenShell from '../../components/common/TabScreenShell';
import { OFFERS } from '../../data/offers';
import { getSalonDetails } from '../../data/salonDetails';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Offers'>;

export default function OffersScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();

  const onCopy = (code: string) => {
    Alert.alert(t('offers.copiedTitle'), t('offers.copiedMessage', { code }));
  };

  return (
    <TabScreenShell active="offers" navigation={navigation}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
        <Tag size={22} color={colors.primary} strokeWidth={2} />
        <Text style={[typography.h2, { color: colors.textPrimary }]}>{t('offers.title')}</Text>
      </View>
      <Text style={[typography.bodySmall, { color: colors.textSecondary, paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        {t('offers.subtitle')}
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.md }}
        showsVerticalScrollIndicator={false}>
        {OFFERS.map(offer => {
          const salon = offer.salonId ? getSalonDetails(offer.salonId) : undefined;
          return (
            <View
              key={offer.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: radius.md,
                  padding: spacing.md,
                },
              ]}>
              <View style={styles.topRow}>
                <View style={[styles.badge, { backgroundColor: colors.primary + '18', borderRadius: radius.sm }]}>
                  <Text style={[typography.caption, { color: colors.primary, fontWeight: '700' }]}>
                    {offer.discount} OFF
                  </Text>
                </View>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {t('offers.validUntil', { date: offer.validUntil })}
                </Text>
              </View>
              <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700', marginTop: spacing.sm }]}>
                {t(offer.titleKey)}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4, lineHeight: 18 }]}>
                {t(offer.descKey)}
              </Text>
              {salon ? (
                <AppPressable
                  onPress={() => navigation.navigate('SalonDetails', { salonId: salon.id })}
                  style={{ marginTop: spacing.sm }}>
                  <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>
                    {salon.name} →
                  </Text>
                </AppPressable>
              ) : null}
              <AppPressable
                onPress={() => onCopy(offer.code)}
                style={[
                  styles.codeRow,
                  {
                    borderColor: colors.border,
                    borderRadius: radius.sm,
                    marginTop: spacing.md,
                    padding: spacing.sm,
                  },
                ]}>
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700', flex: 1 }]}>
                  {offer.code}
                </Text>
                <Copy size={16} color={colors.primary} strokeWidth={2} />
              </AppPressable>
            </View>
          );
        })}
      </ScrollView>
    </TabScreenShell>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  card: { borderWidth: StyleSheet.hairlineWidth },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { paddingHorizontal: 10, paddingVertical: 4 },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
});
