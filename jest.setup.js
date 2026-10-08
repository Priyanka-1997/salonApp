jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: View,
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = props => React.createElement(View, props);
  return new Proxy(
    { default: Mock },
    {
      get: (t, p) => (p in t ? t[p] : Mock),
    },
  );
});

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Icon = () => React.createElement(View);
  return new Proxy(
    {},
    {
      get: () => Icon,
    },
  );
});

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({ children }) => children,
    DarkTheme: {},
    DefaultTheme: {},
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), dispatch: jest.fn() }),
    useRoute: () => ({ params: {} }),
    CommonActions: { reset: jest.fn(config => ({ type: 'RESET', ...config })) },
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }) => <View>{children}</View>,
      Screen: () => null,
    }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
}));

const en = require('./src/locales/en.json');
const hi = require('./src/locales/hi.json');
const i18next = require('i18next');
const { initReactI18next } = require('react-i18next');

function enFallback() {
  return JSON.parse(JSON.stringify(en));
}

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ta: { translation: enFallback() },
    te: { translation: enFallback() },
    kn: { translation: enFallback() },
    mr: { translation: enFallback() },
    gu: { translation: enFallback() },
    bn: { translation: enFallback() },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  keySeparator: '.',
  nsSeparator: ':',
});
