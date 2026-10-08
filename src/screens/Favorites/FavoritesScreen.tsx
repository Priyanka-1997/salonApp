import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import TabScreenShell from '../../components/common/TabScreenShell';
import SalonListCard from '../../components/salon/SalonListCard';
import { SALONS } from '../../data/salons';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();
  const { favoriteIds } = useAppData();

  const favorites = useMemo(
    () => SALONS.filter(s => favoriteIds.includes(s.id)),
    [favoriteIds],
  );

  return (
    <TabScreenShell active="favorites" navigation={navigation}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
        <Heart size={22} color={colors.primary} fill={colors.primary} strokeWidth={0} />
        <Text style={[typography.h2, { color: colors.textPrimary }]}>{t('favorites.title')}</Text>
      </View>
      <Text style={[typography.bodySmall, { color: colors.textSecondary, paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        {t('favorites.subtitle')}
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.md }}
        showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl }]}>
            {t('favorites.empty')}
          </Text>
        ) : (
          favorites.map(salon => (
            <SalonListCard
              key={salon.id}
              salon={salon}
              onBook={() => navigation.navigate('SalonDetails', { salonId: salon.id })}
              onPress={() => navigation.navigate('SalonDetails', { salonId: salon.id })}
            />
          ))
        )}
      </ScrollView>
    </TabScreenShell>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
});
