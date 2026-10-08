/**
 * Global design tokens — keep in sync with specs/Styles.md
 *
 * Font files live in `assets/fonts/` (Inter, Poppins, Noto Sans Devanagari).
 * Run `npx react-native-asset` after adding fonts so native projects pick them up.
 */

export const colors = {
  light: {
    primary: '#E85D4A',
    primaryDark: '#C94738',
    accent: '#F4B860',
    success: '#22A06B',
    background: '#FAF8F6',
    card: '#FFFFFF',
    textPrimary: '#1C1917',
    textSecondary: '#78716C',
    /** Input placeholders and faint hints — lighter than textSecondary */
    placeholder: '#A8A29E',
    border: '#E7E1DC',
  },
  dark: {
    primary: '#E85D4A',
    primaryDark: '#C94738',
    accent: '#F4B860',
    success: '#22A06B',
    background: '#1C1917',
    card: '#292524',
    textPrimary: '#FAF8F6',
    textSecondary: '#A8A29E',
    placeholder: '#78716C',
    border: '#44403C',
  },
} as const;

export type ColorScheme = 'light' | 'dark';

export type ThemeColors = (typeof colors)[ColorScheme];

/**
 * Linked font family names (match `.ttf` basenames from `assets/fonts/`).
 * Use explicit files (Inter-Medium, Inter-Bold) instead of fontWeight when possible — more consistent on Android.
 */
export const fonts = {
  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
  notoSansDevanagari: 'NotoSansDevanagari-Regular',
} as const;

export function getColors(scheme: ColorScheme | null | undefined): ThemeColors {
  return scheme === 'dark' ? colors.dark : colors.light;
}
