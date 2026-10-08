import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

/** Legacy route — old bundles navigated here; redirect to Salon Details. */
export default function BookingRedirectScreen({ route, navigation }: Props) {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.replace('SalonDetails', { salonId: route.params?.salonId ?? '1' });
  }, [navigation, route.params?.salonId]);

  return (
    <View style={[styles.centered, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
