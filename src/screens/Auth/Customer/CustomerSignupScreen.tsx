import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
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
import { ArrowLeft, ArrowRight, Check, ChevronDown, Mail, Phone, UserRound } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../../components/common/AppPressable';
import { images } from '../../../constants/images';
import { useAuth } from '../../../hooks/useAuth';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { getColors } from '../../../theme/tokens';
import { useTheme } from '../../../theme/useTheme';
import { isValidEmail } from '../../../utils/email';
import { isValidIndianMobile, normalizeIndianMobile } from '../../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomerSignup'>;

type SignupFieldProps = {
  Icon: LucideIcon;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
};

function SignupField({
  Icon,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize,
}: SignupFieldProps) {
  const { typography, radius } = useTheme();
  const colors = getColors('light');

  return (
    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.md }]}>
      <Icon size={20} color={colors.textSecondary} strokeWidth={1.8} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        style={[typography.bodySmall, styles.input, { color: colors.textPrimary }]}
      />
    </View>
  );
}

export default function CustomerSignupScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { typography, spacing, radius } = useTheme();
  const colors = getColors('light');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const phoneOk = isValidIndianMobile(phone);
  const emailOk = email.trim() === '' || isValidEmail(email);
  const canSubmit = useMemo(
    () => fullName.trim().length > 1 && phoneOk && emailOk && termsAgreed,
    [fullName, phoneOk, emailOk, termsAgreed],
  );

  const onSubmit = () => {
    if (!canSubmit) {
      return;
    }
    const normalized = normalizeIndianMobile(phone);
    if (!signUp(normalized, 'verified', '', fullName.trim(), email.trim() || undefined, 'customer')) {
      Alert.alert(t('auth.errorTitle'), t('auth.phoneExists'));
      return;
    }
    navigation.navigate('CustomerOtp', { phone: normalized });
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
                  navigation.replace('CustomerLogin');
                }
              }}
              style={[styles.backButton, { top: insets.top + spacing.sm, left: spacing.lg }]}
              hitSlop={8}>
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2.2} />
            </AppPressable>
          </View>

          <View style={[styles.form, { paddingHorizontal: spacing.lg, marginTop: spacing.sm }]}>
            <Text style={[typography.h2, styles.title, { color: colors.textPrimary }]}>
              {t('customerSignup.title')}
            </Text>
            <Text style={[typography.bodySmall, styles.subtitle, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              {t('customerSignup.subtitle')}
            </Text>

            <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
              <SignupField
                Icon={UserRound}
                value={fullName}
                onChangeText={setFullName}
                placeholder={t('signup.name')}
                autoCapitalize="words"
              />

              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.md }]}>
                <Phone size={20} color={colors.textSecondary} strokeWidth={1.8} />
                <View style={styles.countryCode}>
                  <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>+91</Text>
                  <ChevronDown size={15} color={colors.textSecondary} />
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <TextInput
                  value={phone}
                  onChangeText={value => setPhone(normalizeIndianMobile(value))}
                  placeholder={t('customerSignup.phone')}
                  placeholderTextColor={colors.placeholder}
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={[typography.bodySmall, styles.phoneInput, { color: colors.textPrimary }]}
                />
              </View>

              <SignupField
                Icon={Mail}
                value={email}
                onChangeText={setEmail}
                placeholder={t('customerSignup.email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <AppPressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: termsAgreed }}
              onPress={() => setTermsAgreed(value => !value)}
              style={[styles.termsRow, { marginTop: spacing.md, marginBottom: spacing.lg }]}>
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: termsAgreed ? colors.primary : colors.border,
                    backgroundColor: termsAgreed ? colors.primary : colors.card,
                    borderRadius: radius.sm,
                  },
                ]}>
                {termsAgreed ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : null}
              </View>
              <Text style={[typography.caption, styles.termsText, { color: colors.textSecondary }]}>
                {t('signup.termsPrefix')}{' '}
                <Text style={{ color: colors.primary, fontWeight: '600' }} onPress={() => navigation.navigate('Terms')}>
                  {t('signup.terms')}
                </Text>{' '}
                {t('signup.termsAnd')}{' '}
                <Text style={{ color: colors.primary, fontWeight: '600' }} onPress={() => navigation.navigate('Privacy')}>
                  {t('signup.privacy')}
                </Text>
                .
              </Text>
            </AppPressable>

            <AppPressable
              accessibilityRole="button"
              disabled={!canSubmit}
              onPress={onSubmit}
              style={({ pressed }: { pressed: boolean }) => [
                styles.continueButton,
                { borderRadius: radius.md, opacity: !canSubmit ? 0.72 : pressed ? 0.88 : 1 },
              ]}>
              <Svg pointerEvents="none" style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id="customerSignupButton" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor={colors.primary} />
                    <Stop offset="100%" stopColor="#FF846D" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#customerSignupButton)" />
              </Svg>
              <Text style={[typography.button, styles.continueText, { color: '#FFFFFF' }]}>
                {t('customerSignup.continue')}
              </Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </AppPressable>

            <View style={[styles.loginRow, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
              <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>{t('signup.haveAccount')}</Text>
              <AppPressable onPress={() => navigation.navigate('CustomerLogin')} accessibilityRole="link" hitSlop={8}>
                <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                  {t('signup.signInLink')}
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
  title: { fontSize: 25, textAlign: 'center' },
  subtitle: { textAlign: 'center', lineHeight: 20 },
  inputContainer: {
    minHeight: 56,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: { flex: 1, height: '100%', marginLeft: 12, paddingVertical: 10, includeFontPadding: false },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 12 },
  divider: { width: 1, height: 25, marginHorizontal: 12 },
  phoneInput: { flex: 1, height: '100%', paddingVertical: 10, includeFontPadding: false },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox: { width: 22, height: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  termsText: { flex: 1, lineHeight: 19 },
  continueButton: {
    minHeight: 56,
    paddingHorizontal: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  continueText: { flex: 1, textAlign: 'center' },
  loginRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 },
});