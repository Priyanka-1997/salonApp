import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import hi from '../locales/hi.json';
import type { AppLanguageCode } from '../locales/languages';

export const LANGUAGE_STORAGE_KEY = '@SalonApp/language';

/** Deep copy English bundle for langs without their own JSON yet */
function enAsFallback() {
  return JSON.parse(JSON.stringify(en)) as typeof en;
}

let initPromise: Promise<void> | null = null;

function buildResources() {
  return {
    en: { translation: en },
    hi: { translation: hi },
    ta: { translation: enAsFallback() },
    te: { translation: enAsFallback() },
    kn: { translation: enAsFallback() },
    mr: { translation: enAsFallback() },
    gu: { translation: enAsFallback() },
    bn: { translation: enAsFallback() },
  };
}

function mergeResourceBundles() {
  const resources = buildResources();
  for (const [lang, bundle] of Object.entries(resources)) {
    i18n.addResourceBundle(lang, 'translation', bundle.translation, true, true);
  }
}

export async function initI18n(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    const lng = (saved as AppLanguageCode | null) ?? 'en';

    if (i18n.isInitialized) {
      mergeResourceBundles();
      await i18n.changeLanguage(lng);
      return;
    }

    await i18n.use(initReactI18next).init({
      compatibilityJSON: 'v4',
      resources: buildResources(),
      lng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      keySeparator: '.',
      nsSeparator: ':',
    });
  })();

  return initPromise;
}

export async function persistLanguage(code: AppLanguageCode): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
}

export { i18n };
