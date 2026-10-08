import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Mail, User } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthEmailDivider from '../../components/auth/AuthEmailDivider';
import AuthFormCard from '../../components/auth/AuthFormCard';
import AuthHero from '../../components/auth/AuthHero';
import AuthIconInput from '../../components/auth/AuthIconInput';
import AuthPerksBand from '../../components/auth/AuthPerksBand';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';
import PasswordInput from '../../components/auth/PasswordInput';
import PhoneCountryInput from '../../components/auth/PhoneCountryInput';
import WhatsAppSignInButton from '../../components/auth/WhatsAppSignInButton';
import AppPressable from '../../components/common/AppPressable';
import Button from '../../components/common/Button';
import { images } from '../../constants/images';
import { useAuth } from '../../hooks/useAuth';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { isValidEmail } from '../../utils/email';
import { isValidIndianMobile, normalizeIndianMobile } from '../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { signUp, loginWithGoogle, loginWithWhatsApp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const phoneOk = isValidIndianMobile(phone);
  const emailOk = email.trim() === '' || isValidEmail(email);

  const canSubmit = useMemo(
    () =>
      fullName.trim().length > 1 &&
      phoneOk &&
      emailOk &&
      password.length >= 4 &&
      password === confirmPassword &&
      termsAgreed,
    [fullName, phoneOk, emailOk, password, confirmPassword, termsAgreed],
  );

  const onSubmit = () => {
    if (!canSubmit) {
      if (password !== confirmPassword) {
        Alert.alert(t('signup.errorTitle'), t('signup.passwordMismatch'));
      }
      return;
    }
    const normalized = normalizeIndianMobile(phone);
    if (!signUp(normalized, 'verified', password, fullName.trim(), email.trim() || undefined, 'customer')) {
      Alert.alert(t('auth.errorTitle'), t('auth.phoneExists'));
      return;
    }
    navigation.navigate('Otp', { phone: normalized });
  };

  const onWhatsApp = () => {
    loginWithWhatsApp();
    navigation.navigate('Otp', { phone: normalizeIndianMobile(phone) || '9876543210' });
  };

  const onGoogle = () => {
    loginWithGoogle();
    navigation.navigate('Otp', { phone: normalizeIndianMobile(phone) || '9876543210' });
  };

  const bodyStyle = { paddingHorizontal: spacing.lg };
  const checkboxStyle = {
    borderColor: termsAgreed ? colors.primary : colors.border,
    backgroundColor: termsAgreed ? colors.primary : colors.card,
    borderRadius: radius.sm,
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        <AuthHero
          photo={images.heroSignup}
          title={t('signup.title')}
          subtitle={t('signup.subtitle')}
          onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        />

        <View style={[styles.body, bodyStyle]}>
          <AuthFormCard>
            <AuthIconInput
              label={t('signup.name')}
              value={fullName}
              onChangeText={setFullName}
              placeholder={t('signup.namePlaceholder')}
              icon={User}
              autoCapitalize="words"
            />

            <PhoneCountryInput
              value={phone}
              onChangeText={text => setPhone(normalizeIndianMobile(text))}
              showPhoneIcon
              label={t('phoneLogin.mobile')}
            />

            <AuthIconInput
              label={t('signup.email')}
              value={email}
              onChangeText={setEmail}
              placeholder={t('signup.emailPlaceholder')}
              icon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <PasswordInput
              value={password}
              onChangeText={setPassword}
              label={t('credentials.password')}
              placeholder={t('signup.passwordPlaceholder')}
            />

            <PasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              label={t('signup.confirmPassword')}
              placeholder={t('signup.confirmPasswordPlaceholder')}
            />

            <AppPressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: termsAgreed }}
              onPress={() => setTermsAgreed(v => !v)}
              style={[styles.termsRow, { marginBottom: spacing.lg }]}>
              <View style={[styles.checkbox, checkboxStyle]}>
                {termsAgreed ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <Text style={[typography.bodySmall, styles.termsText, { color: colors.textSecondary }]}>
                {t('signup.termsPrefix')}{' '}
                <Text
                  style={{ color: colors.primary, fontWeight: '600' }}
                  onPress={() => navigation.navigate('Terms')}>
                  {t('signup.terms')}
                </Text>
                {' '}{t('signup.termsAnd')}{' '}
                <Text
                  style={{ color: colors.primary, fontWeight: '600' }}
                  onPress={() => navigation.navigate('Privacy')}>
                  {t('signup.privacy')}
                </Text>
              </Text>
            </AppPressable>

            <Button
              title={t('signup.submit')}
              onPress={onSubmit}
              disabled={!canSubmit}
              icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />}
            />

            <AuthEmailDivider labelKey="signup.dividerOr" />

            <WhatsAppSignInButton onPress={onWhatsApp} labelKey="signup.whatsapp" />
            <GoogleSignInButton onPress={onGoogle} labelKey="signup.google" />
          </AuthFormCard>

          <View style={styles.loginRow}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>{t('signup.haveAccount')}</Text>
            <AppPressable onPress={() => navigation.navigate('CustomerLogin')} accessibilityRole="link" hitSlop={8}>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                {t('signup.signInLink')}
              </Text>
            </AppPressable>
          </View>

          <View style={styles.bandWrap}>
            <AuthPerksBand />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  body: {
    paddingTop: 24,
    flexGrow: 1,
  },
  bandWrap: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    lineHeight: 20,
  },
  loginRow: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
