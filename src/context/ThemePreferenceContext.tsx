import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ColorScheme } from '../theme/tokens';

const STORAGE_KEY = '@SalonApp/themePreference';

export type ThemePreference = 'system' | 'light' | 'dark';

type Ctx = {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  /** Resolved light/dark after applying system vs manual choice */
  resolvedScheme: ColorScheme;
  hydrated: boolean;
};

const ThemePreferenceContext = createContext<Ctx | undefined>(undefined);

function resolveScheme(preference: ThemePreference, system: string | null | undefined): ColorScheme {
  if (preference === 'light') {
    return 'light';
  }
  if (preference === 'dark') {
    return 'dark';
  }
  return system === 'dark' ? 'dark' : 'light';
}

export function ThemePreferenceProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(value => {
      if (value === 'light' || value === 'dark' || value === 'system') {
        setPreferenceState(value);
      }
      setHydrated(true);
    });
  }, []);

  const setPreference = useCallback(async (p: ThemePreference) => {
    setPreferenceState(p);
    await AsyncStorage.setItem(STORAGE_KEY, p);
  }, []);

  const resolvedScheme = useMemo(
    () => resolveScheme(preference, systemScheme),
    [preference, systemScheme],
  );

  const value = useMemo(
    () => ({ preference, setPreference, resolvedScheme, hydrated }),
    [preference, setPreference, resolvedScheme, hydrated],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): Ctx {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error('useThemePreference must be used within ThemePreferenceProvider');
  }
  return ctx;
}
