import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Building2, MapPin, Clock, User, Scissors } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthFormCard from '../../../components/auth/AuthFormCard';
import AuthHero from '../../../components/auth/AuthHero';
import AuthIconInput from '../../../components/auth/AuthIconInput';
import AuthPerksBand from '../../../components/auth/AuthPerksBand';
import PhoneCountryInput from '../../../components/auth/PhoneCountryInput';
import AppPressable from '../../../components/common/AppPressable';
import Button from '../../../components/common/Button';
import { images } from '../../../constants/images';
import { useAuth } from '../../../hooks/useAuth';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useTheme } from '../../../theme/useTheme';
import { isValidIndianMobile, normalizeIndianMobile } from '../../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'ShopkeeperSignup'>;

export default function ShopkeeperSignupScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { signUp } = useAuth();

  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [salonName, setSalonName] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const phoneOk = isValidIndianMobile(phone);

  const canSubmit = useMemo(
    () =>
      ownerName.trim().length > 1 &&
      phoneOk &&
      salonName.trim().length > 1 &&
      address.trim().length > 1 &&
      services.trim().length > 1 &&
      workingHours.trim().length > 1 &&
      termsAgreed,
    [ownerName, phoneOk, salonName, address, services, workingHours, termsAgreed],
  );

  const onSubmit = () => {
    if (!canSubmit) {
      return;
    }
    const normalized = normalizeIndianMobile(phone);
    if (!signUp(normalized, 'verified', '', ownerName.trim(), undefined, 'shopkeeper')) {
      Alert.alert(t('auth.errorTitle'), t('auth.phoneExists'));
      return;
    }
    navigation.navigate('ShopkeeperOtp', { phone: normalized });
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
          photo={images.roleOwner}
          title={t('shopkeeperAuth.signupTitle')}
          subtitle={t('shopkeeperAuth.signupSubtitle')}
          onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        />

        <View style={[styles.body, bodyStyle]}>
          <AuthFormCard>
            <AuthIconInput
              label={t('shopkeeperAuth.ownerName')}
              value={ownerName}
              onChangeText={setOwnerName}
              placeholder={t('shopkeeperAuth.ownerNamePlaceholder')}
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
              label={t('shopkeeperAuth.salonName')}
              value={salonName}
              onChangeText={setSalonName}
              placeholder={t('shopkeeperAuth.salonNamePlaceholder')}
              icon={Building2}
              autoCapitalize="words"
            />

            <AuthIconInput
              label={t('shopkeeperAuth.address')}
              value={address}
              onChangeText={setAddress}
              placeholder={t('shopkeeperAuth.addressPlaceholder')}
              icon={MapPin}
            />

            <AuthIconInput
              label={t('shopkeeperAuth.services')}
              value={services}
              onChangeText={setServices}
              placeholder={t('shopkeeperAuth.servicesPlaceholder')}
              icon={Scissors}
            />

            <AuthIconInput
              label={t('shopkeeperAuth.workingHours')}
              value={workingHours}
              onChangeText={setWorkingHours}
              placeholder={t('shopkeeperAuth.workingHoursPlaceholder')}
              icon={Clock}
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
              title={t('shopkeeperAuth.registerCta')}
              onPress={onSubmit}
              disabled={!canSubmit}
              icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />}
            />
          </AuthFormCard>

          <View style={styles.loginRow}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
              {t('shopkeeperAuth.alreadyRegistered')}
            </Text>
            <AppPressable onPress={() => navigation.navigate('ShopkeeperLogin')} accessibilityRole="link" hitSlop={8}>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                {t('shopkeeperAuth.signInLink')}
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
