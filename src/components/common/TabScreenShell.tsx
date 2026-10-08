import { StyleSheet, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeBottomNav, { type HomeTab } from '../home/HomeBottomNav';
import { useAuth } from '../../hooks/useAuth';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { handleHomeTabChange } from '../../utils/tabNavigation';

type Props = {
  active: HomeTab;
  navigation: { navigate: NativeStackNavigationProp<RootStackParamList>['navigate'] };
  children: React.ReactNode;
};

export default function TabScreenShell({ active, navigation, children }: Props) {
  const { isLoggedIn } = useAuth();

  return (
    <View style={styles.root}>
      {children}
      <HomeBottomNav
        active={active}
        onChange={tab => handleHomeTabChange(navigation, tab, isLoggedIn)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
