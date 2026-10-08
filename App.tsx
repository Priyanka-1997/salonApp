/**
 * @format
 */

import { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import { I18nextProvider } from 'react-i18next';

import AppNavigator from './src/navigation/AppNavigator';
import { AppDataProvider } from './src/context/AppDataContext';
import { AuthProvider } from './src/context/AuthContext';
import { ThemePreferenceProvider, useThemePreference } from './src/context/ThemePreferenceContext';
import { i18n, initI18n } from './src/i18n/config';
import { getColors } from './src/theme/tokens';

function AppWithNavigation() {
  const [i18nReady, setI18nReady] = useState(false);
  const { resolvedScheme } = useThemePreference();
  const isDark = resolvedScheme === 'dark';
  const palette = getColors(resolvedScheme);

  useEffect(() => {
    initI18n()
      .then(() => setI18nReady(true))
      .catch(err => {
        console.error(err);
        setI18nReady(true);
      });
  }, []);

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: palette.primary,
      background: palette.background,
      card: palette.card,
      text: palette.textPrimary,
      border: palette.border,
      notification: palette.accent,
    },
  };

  if (!i18nReady) {
    return (
      <View style={[styles.boot, { backgroundColor: palette.background }]}>
        <ActivityIndicator size="large" color={palette.primary} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </NavigationContainer>
    </I18nextProvider>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemePreferenceProvider>
          <AuthProvider>
            <AppDataProvider>
              <AppWithNavigation />
            </AppDataProvider>
          </AuthProvider>
        </ThemePreferenceProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
