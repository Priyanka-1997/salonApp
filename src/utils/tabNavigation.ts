import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeTab } from '../components/home/HomeBottomNav';
import type { RootStackParamList } from '../navigation/AppNavigator';

type TabNavigation = {
  navigate: NativeStackNavigationProp<RootStackParamList>['navigate'];
};

export function handleHomeTabChange(
  navigation: TabNavigation,
  tab: HomeTab,
  isLoggedIn: boolean,
): void {
  if (tab === 'home') {
    navigation.navigate('Home');
    return;
  }
  if (tab === 'bookings') {
    navigation.navigate('Queue');
    return;
  }
  if (tab === 'favorites') {
    navigation.navigate('Favorites');
    return;
  }
  if (tab === 'offers') {
    navigation.navigate('Offers');
    return;
  }
  if (tab === 'profile') {
    navigation.navigate(isLoggedIn ? 'Profile' : 'Home');
  }
}
