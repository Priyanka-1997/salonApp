import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthEmailDivider from '../../components/auth/AuthEmailDivider';
import AuthFormCard from '../../components/auth/AuthFormCard';
import AuthHero from '../../components/auth/AuthHero';
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
import { isValidIndianMobile, normalizeIndianMobile } from '../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();
  const { login, loginWithGoogle, loginWithWhatsApp } = useAuth();
  const [phone, setPhone] = useState('9876543210');
  const [password, setPassword] = useState('');

  const salonId = route.params?.salonId;
  const slotLabel = route.params?.slotLabel;
  const dateIso = route.params?.dateIso;
  const serviceIds = route.params?.serviceIds ?? [];
  const canLogin = isValidIndianMobile(phone) && password.length > 0;

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  const onLogin = () => {
    if (!canLogin) {
      return;
    }
    const normalized = normalizeIndianMobile(phone);
    if (salonId && slotLabel && dateIso) {
      navigation.navigate('Otp', { phone: normalized, password, role: 'customer', salonId, slotLabel, dateIso, serviceIds });
      return;
    }
    if (!login(normalized, 'verified', password, 'customer')) {
      Alert.alert(t('auth.errorTitle'), t('auth.invalidCredentials'));
      return;
    }
    goHome();
  };

  const onWhatsApp = () => {
    loginWithWhatsApp();
    if (salonId && slotLabel && dateIso) {
      navigation.navigate('Otp', {
        phone: normalizeIndianMobile(phone),
        salonId,
        slotLabel,
        dateIso,
        serviceIds,
      });
    } else {
      goHome();
    }
  };

  const onGoogle = () => {
    loginWithGoogle();
    if (salonId && slotLabel && dateIso) {
      navigation.navigate('Otp', {
        phone: normalizeIndianMobile(phone),
        salonId,
        slotLabel,
        dateIso,
        serviceIds,
      });
    } else {
      goHome();
    }
  };

  const bodyStyle = { paddingHorizontal: spacing.lg };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        <AuthHero
          photo={images.heroLogin}
          title={t('login.welcome')}
          subtitle={t('login.welcomeSubtitle')}
          onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        />

        <View style={[styles.body, bodyStyle]}>
          <AuthFormCard>
            <PhoneCountryInput value={phone} onChangeText={text => setPhone(normalizeIndianMobile(text))} />
            <PasswordInput value={password} onChangeText={setPassword} />

            <AppPressable
              accessibilityRole="link"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotWrap}>
              <Text style={[typography.bodySmall, styles.forgotText, { color: colors.primary }]}>
                {t('credentials.forgotPassword')}
              </Text>
            </AppPressable>

            <Button
              title={t('credentials.signIn')}
              onPress={onLogin}
              disabled={!canLogin}
              icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />}
            />

            <AuthEmailDivider labelKey="signup.dividerOr" />

            <WhatsAppSignInButton onPress={onWhatsApp} />
            <GoogleSignInButton onPress={onGoogle} />
          </AuthFormCard>

          <View style={styles.signupRow}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>{t('credentials.noAccount')}</Text>
            <AppPressable onPress={() => navigation.navigate('Signup')} accessibilityRole="link" hitSlop={8}>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                {t('credentials.signUpLink')}
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
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: 4,
  },
  forgotText: {
    fontWeight: '600',
  },
  signupRow: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
