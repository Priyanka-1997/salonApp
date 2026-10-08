import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Mail, User } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthIconInput from '../../components/auth/AuthIconInput';
import PhoneCountryInput from '../../components/auth/PhoneCountryInput';
import Button from '../../components/common/Button';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { useAuth } from '../../hooks/useAuth';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { isValidEmail } from '../../utils/email';
import { isValidIndianMobile, normalizeIndianMobile } from '../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.emailOrPhone?.replace(/\D/g, '').slice(-10) ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const canSave =
    name.trim().length > 1 &&
    isValidIndianMobile(phone) &&
    (email.trim() === '' || isValidEmail(email));

  const onSave = () => {
    if (!canSave) {
      return;
    }
    updateProfile({
      name: name.trim(),
      emailOrPhone: normalizeIndianMobile(phone),
      email: email.trim() || undefined,
    });
    Alert.alert(t('editProfile.savedTitle'), t('editProfile.savedMessage'), [
      { text: t('common.ok'), onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.flex}>
      <ScreenBackHeader title={t('editProfile.title')} onBack={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}>
        <AuthIconInput
          label={t('signup.name')}
          value={name}
          onChangeText={setName}
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
        <Button title={t('editProfile.save')} onPress={onSave} disabled={!canSave} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
