import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../../components/common/AppPressable';
import GoogleIcon from '../../../components/auth/GoogleIcon';
import { images } from '../../../constants/images';
import { useAuth } from '../../../hooks/useAuth';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { getColors } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { isValidIndianMobile, normalizeIndianMobile } from '../../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomerLogin'>;

export default function CustomerLoginScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { typography, spacing, radius } = useTheme();
  const colors = getColors('light');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { loginWithGoogle } = useAuth();
  const [phone, setPhone] = useState('');

  const salonId = route.params?.salonId;
  const slotLabel = route.params?.slotLabel;
  const dateIso = route.params?.dateIso;
  const serviceIds = route.params?.serviceIds ?? [];

  const canLogin = isValidIndianMobile(phone);

  const onSendOtp = () => {
    if (!canLogin) {
      return;
    }
    const normalized = normalizeIndianMobile(phone);
    navigation.navigate('CustomerOtp', { phone: normalized, salonId, slotLabel, dateIso, serviceIds });
  };

  const onGoogle = () => {
    loginWithGoogle();
    navigation.navigate('CustomerOtp', {
      phone: normalizeIndianMobile(phone) || '9876543210',
      salonId,
      slotLabel,
      dateIso,
      serviceIds,
    });
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: spacing.lg }]}>
          <View style={[styles.hero, { width, height: width * (1040 / 1165) }]}>
            <Image
              source={images.customerSignupHero}
              style={styles.heroImage}
              resizeMode="stretch"
              accessibilityLabel={t('nav.app')}
              accessibilityIgnoresInvertColors
            />
            <AppPressable
              accessibilityRole="button"
              accessibilityLabel={t('common.goBack')}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.replace('RoleSelection');
                }
              }}
              style={[styles.backButton, { top: insets.top + spacing.sm, left: spacing.lg }]}
              hitSlop={8}>
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.2} />
            </AppPressable>
          </View>

          <View style={[styles.form, { paddingHorizontal: spacing.lg, marginTop: spacing.sm }]}>
            <Text style={[typography.h2, styles.title, { color: colors.textPrimary }]}>
              {t('customerLogin.title')}
            </Text>
            <Text style={[typography.bodySmall, styles.subtitle, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              {t('customerLogin.subtitle')}
            </Text>

            <Text style={[typography.label, styles.label, { color: colors.textPrimary, marginTop: spacing.lg, marginBottom: spacing.xs }]}>
              {t('phoneLogin.mobile')}
            </Text>
            <View style={[styles.phoneInput, { borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.md }]}>
              <Text style={styles.indiaFlag}>🇮🇳</Text>
              <View style={styles.countryCode}>
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>+91</Text>
                <ChevronDown size={15} color={colors.textSecondary} />
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <TextInput
                value={phone}
                onChangeText={value => setPhone(normalizeIndianMobile(value))}
                placeholder={t('login.mobilePlaceholder')}
                placeholderTextColor={colors.placeholder}
                keyboardType="phone-pad"
                maxLength={10}
                style={[typography.bodySmall, styles.phoneValue, { color: colors.textPrimary }]}
              />
            </View>

            <AppPressable
              accessibilityRole="button"
              disabled={!canLogin}
              onPress={onSendOtp}
              style={({ pressed }: { pressed: boolean }) => [
                styles.primaryButton,
                { borderRadius: radius.md, opacity: !canLogin ? 0.55 : pressed ? 0.88 : 1 },
              ]}>
              <Svg pointerEvents="none" style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id="customerLoginButton" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor={colors.primary} />
                    <Stop offset="100%" stopColor="#FF846D" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#customerLoginButton)" />
              </Svg>
              <Text style={[typography.button, styles.primaryButtonText, { color: '#FFFFFF' }]}>
                {t('phoneLogin.sendOtp')}
              </Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </AppPressable>

            <View style={[styles.orRow, { marginTop: spacing.md, marginBottom: spacing.md }]}>
              <View style={[styles.orLine, { backgroundColor: colors.border }]} />
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{t('signup.dividerOr')}</Text>
              <View style={[styles.orLine, { backgroundColor: colors.border }]} />
            </View>

            <AppPressable
              accessibilityRole="button"
              onPress={onGoogle}
              style={[styles.googleButton, { borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.md }]}>
              <GoogleIcon size={22} />
              <Text style={[typography.bodySmall, styles.googleLabel, { color: colors.textPrimary }]}>
                {t('customerLogin.google')}
              </Text>
            </AppPressable>

            <View style={[styles.legal, { marginTop: spacing.lg }]}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {t('customerLogin.legal')}
              </Text>
              <View style={styles.legalLinks}>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {t('signup.termsPrefix')}{' '}
                </Text>
                <Text style={[typography.caption, styles.legalLink, { color: colors.primary }]} onPress={() => navigation.navigate('Terms')}>
                  {t('signup.terms')}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}> {t('signup.termsAnd')} </Text>
                <Text style={[typography.caption, styles.legalLink, { color: colors.primary }]} onPress={() => navigation.navigate('Privacy')}>
                  {t('signup.privacy')}
                </Text>
              </View>
            </View>

            <View style={[styles.signupRow, { marginTop: spacing.md }]}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>{t('phoneLogin.newCustomer')}</Text>
              <AppPressable onPress={() => navigation.navigate('CustomerSignup')} accessibilityRole="link" hitSlop={8}>
                <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                  {t('customerLogin.createAccount')}
                </Text>
              </AppPressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  hero: { position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  backButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { flexGrow: 1 },
  title: { fontSize: 23, textAlign: 'left' },
  subtitle: { lineHeight: 20 },
  label: { fontWeight: '700' },
  phoneInput: {
    minHeight: 56,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  indiaFlag: { fontSize: 18, marginRight: 8 },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  divider: { width: 1, height: 25, marginHorizontal: 12 },
  phoneValue: { flex: 1, paddingVertical: 10, includeFontPadding: false },
  primaryButton: {
    minHeight: 56,
    paddingHorizontal: 18,
    marginTop: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonText: { flex: 1, textAlign: 'center' },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orLine: { height: StyleSheet.hairlineWidth, flex: 1 },
  googleButton: {
    minHeight: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleLabel: { fontWeight: '600' },
  legal: { alignItems: 'center', gap: 4 },
  legalLinks: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  legalLink: { textDecorationLine: 'underline' },
  signupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
