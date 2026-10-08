/**
 * Supported app language codes (i18n).
 * Non-en/hi bundles use English copy until translated — see `src/i18n/config.ts`.
 */
export type AppLanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'te'
  | 'kn'
  | 'mr'
  | 'gu'
  | 'bn';

export type LanguageOption = {
  code: AppLanguageCode;
  /** English label for settings lists */
  label: string;
  /** Native name shown in selector */
  nativeLabel: string;
};

export const APP_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
];
