import { getColors } from './tokens';
import { typography } from './typography';
import { radius, spacing } from './spacing';
import { useThemePreference } from '../context/ThemePreferenceContext';

export function useTheme() {
  const { resolvedScheme } = useThemePreference();
  const colors = getColors(resolvedScheme);

  return {
    scheme: resolvedScheme,
    isDark: resolvedScheme === 'dark',
    colors,
    typography,
    spacing,
    radius,
  };
}
