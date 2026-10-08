import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, ChevronLeft } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneCountryInput from '../../components/auth/PhoneCountryInput';
import AppPressable from '../../components/common/AppPressable';
import Button from '../../components/common/Button';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { isValidIndianMobile, normalizeIndianMobile } from '../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();
  const [phone, setPhone] = useState('');
  const canSend = isValidIndianMobile(phone);

  const onSend = () => {
    if (!canSend) {
      return;
    }
    navigation.navigate('Otp', {
      phone: normalizeIndianMobile(phone),
      mode: 'resetPassword',
    });
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.lg }]}>
        <AppPressable onPress={() => navigation.goBack()} style={styles.back}>
          <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2.2} />
        </AppPressable>

        <Text style={[typography.h2, { color: colors.textPrimary }]}>{t('forgotPassword.title')}</Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 20 }]}>
          {t('forgotPassword.subtitle')}
        </Text>

        <View style={{ marginTop: spacing.xl }}>
          <PhoneCountryInput
            value={phone}
            onChangeText={text => setPhone(normalizeIndianMobile(text))}
            showPhoneIcon
            label={t('phoneLogin.mobile')}
          />
          <Button
            title={t('forgotPassword.sendOtp')}
            onPress={onSend}
            disabled={!canSend}
            icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 32 },
  back: { alignSelf: 'flex-start', padding: 4, marginBottom: 16 },
});
