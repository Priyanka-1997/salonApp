import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CategoryScroller from '../../components/home/CategoryScroller';
import HomeBottomNav, { type HomeTab } from '../../components/home/HomeBottomNav';
import HomeHeader from '../../components/home/HomeHeader';
import PromoBanner from '../../components/home/PromoBanner';
import SearchBar from '../../components/home/SearchBar';
import SalonListCard from '../../components/salon/SalonListCard';
import type { Salon } from '../../data/salons';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../hooks/useAuth';
import { fetchSalons } from '../../services/salonService';
import { useTheme } from '../../theme/useTheme';
import { handleHomeTabChange } from '../../utils/tabNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<HomeTab>('home');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await fetchSalons();
      if (mounted) {
        setSalons(list);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return salons;
    }
    return salons.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q),
    );
  }, [salons, search]);

  const onTabChange = (tab: HomeTab) => {
    if (tab === 'home') {
      setActiveTab('home');
      return;
    }
    handleHomeTabChange(navigation, tab, isLoggedIn);
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <SearchBar value={search} onChangeText={setSearch} />
        <CategoryScroller />

        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
          {t('home.nearbyTitle')}
        </Text>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginVertical: spacing.xl }} />
        ) : (
          <View style={{ gap: spacing.md }}>
            {filtered.map(salon => (
              <SalonListCard
                key={salon.id}
                salon={salon}
                onBook={() => navigation.navigate('SalonDetails', { salonId: salon.id })}
                onPress={() => navigation.navigate('SalonDetails', { salonId: salon.id })}
              />
            ))}
            {filtered.length === 0 ? (
              <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
                {t('home.noResults')}
              </Text>
            ) : null}
          </View>
        )}

        <PromoBanner />
      </ScrollView>

      <HomeBottomNav active={activeTab} onChange={onTabChange} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
