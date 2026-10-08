import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthFormCard from '../../../components/auth/AuthFormCard';
import AuthHero from '../../../components/auth/AuthHero';
import AuthPerksBand from '../../../components/auth/AuthPerksBand';
import PhoneCountryInput from '../../../components/auth/PhoneCountryInput';
import AppPressable from '../../../components/common/AppPressable';
import Button from '../../../components/common/Button';
import { images } from '../../../constants/images';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { useTheme } from '../../../theme/useTheme';
import { isValidIndianMobile, normalizeIndianMobile } from '../../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'ShopkeeperLogin'>;

export default function ShopkeeperLoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();
  const [phone, setPhone] = useState('');

  const canLogin = isValidIndianMobile(phone);

  const onSendOtp = () => {
    if (!canLogin) {
      return;
    }
    const normalized = normalizeIndianMobile(phone);
    navigation.navigate('ShopkeeperOtp', { phone: normalized });
  };

  const bodyStyle = { paddingHorizontal: spacing.lg };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        <AuthHero
              photo={images.roleOwner}
          title={t('shopkeeperAuth.loginTitle')}
          subtitle={t('shopkeeperAuth.loginSubtitle')}
          onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        />

        <View style={[styles.body, bodyStyle]}>
          <AuthFormCard>
            <PhoneCountryInput
              value={phone}
              onChangeText={text => setPhone(normalizeIndianMobile(text))}
              label={t('phoneLogin.mobile')}
            />

            <Button
              title={t('phoneLogin.sendOtp')}
              onPress={onSendOtp}
              disabled={!canLogin}
              icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />}
            />
          </AuthFormCard>

          <View style={styles.signupRow}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
              {t('shopkeeperAuth.newOwner')}
            </Text>
            <AppPressable onPress={() => navigation.navigate('ShopkeeperSignup')} accessibilityRole="link" hitSlop={8}>
              <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '700' }]}>
                {t('shopkeeperAuth.registerLink')}
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
  signupRow: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
