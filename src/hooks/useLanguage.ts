import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { persistLanguage } from '../i18n/config';
import type { AppLanguageCode } from '../locales/languages';

export function useLanguage() {
  const { i18n } = useTranslation();

  const setLanguage = useCallback(async (code: AppLanguageCode) => {
    await i18n.changeLanguage(code);
    await persistLanguage(code);
  }, [i18n]);

  const current =
    (i18n.resolvedLanguage ?? i18n.language)?.split('-')[0] ?? 'en';

  return {
    language: current as AppLanguageCode,
    setLanguage,
  };
}
