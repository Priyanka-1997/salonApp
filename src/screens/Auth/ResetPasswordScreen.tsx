import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, ChevronLeft } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PasswordInput from '../../components/auth/PasswordInput';
import AppPressable from '../../components/common/AppPressable';
import Button from '../../components/common/Button';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing } = useTheme();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const canSave = useMemo(
    () => password.length >= 4 && password === confirm,
    [password, confirm],
  );

  const onSave = () => {
    if (!canSave) {
      Alert.alert(t('signup.errorTitle'), t('signup.passwordMismatch'));
      return;
    }
    Alert.alert(t('forgotPassword.successTitle'), t('forgotPassword.successMessage'), [
      { text: t('common.ok'), onPress: () => navigation.navigate('CustomerLogin') },
    ]);
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.lg }]}>
        <AppPressable onPress={() => navigation.goBack()} style={styles.back}>
          <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2.2} />
        </AppPressable>

        <Text style={[typography.h2, { color: colors.textPrimary }]}>{t('forgotPassword.resetTitle')}</Text>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          {t('forgotPassword.resetSubtitle')}
        </Text>

        <PasswordInput
          value={password}
          onChangeText={setPassword}
          label={t('credentials.password')}
          placeholder={t('signup.passwordPlaceholder')}
        />
        <PasswordInput
          value={confirm}
          onChangeText={setConfirm}
          label={t('signup.confirmPassword')}
          placeholder={t('signup.confirmPasswordPlaceholder')}
        />

        <Button
          title={t('forgotPassword.savePassword')}
          onPress={onSave}
          disabled={!canSave}
          icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 32 },
  back: { alignSelf: 'flex-start', padding: 4, marginBottom: 16 },
});
