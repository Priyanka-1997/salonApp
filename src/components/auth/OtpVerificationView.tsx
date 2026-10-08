import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, MessageCircle, Pencil, Smartphone } from 'lucide-react-native';
import AppPressable from '../common/AppPressable';
import OtpBoxes, { OTP_LENGTH } from './OtpBoxes';
import { images } from '../../constants/images';
import { getColors } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import { formatIndianMobile } from '../../utils/phone';

type Props = {
  phone: string;
  bookingSlot?: string;
  onBack: () => void;
  onEditPhone?: () => void;
  onVerify: (code: string) => boolean;
};

const RESEND_SECONDS = 30;

export default function OtpVerificationView({ phone, bookingSlot, onBack, onEditPhone, onVerify }: Props) {
  const { t } = useTranslation();
  const { typography, spacing, radius } = useTheme();
  const colors = getColors('light');
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [verifyError, setVerifyError] = useState(false);
  const isComplete = otp.length === OTP_LENGTH;
  const formattedPhone = formatIndianMobile(phone);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(value => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const onResend = () => {
    if (secondsLeft > 0) {
      return;
    }
    setSecondsLeft(RESEND_SECONDS);
    setOtp('');
    setVerifyError(false);
  };

  const handleVerify = () => {
    if (!isComplete) {
      return;
    }
    setVerifyError(!onVerify(otp));
  };

  const timerLabel = secondsLeft > 0
    ? t('otp.resendIn', { time: `00:${String(secondsLeft).padStart(2, '0')}` })
    : t('otp.resendNow');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: insets.top + spacing.xs }]}>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={t('common.goBack')}
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.full }]}
            hitSlop={8}>
            <ArrowLeft size={21} color={colors.textPrimary} />
          </AppPressable>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }]}>
          <View style={[styles.brand, { marginTop: spacing.sm }]}>
            <Image source={images.appIcon} style={styles.brandMark} resizeMode="contain" accessibilityIgnoresInvertColors />
            <Text style={[typography.h3, styles.brandBook, { color: colors.textPrimary }]}>
              B<Text style={{ color: colors.primary }}>OO</Text>K
            </Text>
            <Text style={[typography.label, styles.brandSalon, { color: colors.primary }]}>MY SALON</Text>
          </View>

          <View style={[styles.illustrationWrap, { marginTop: spacing.lg }]}>
            <View style={[styles.illustration, { backgroundColor: '#FFF0EC', borderRadius: radius.full }]}>
              <Smartphone size={48} color={colors.primary} strokeWidth={1.7} />
              <View style={[styles.messageBadge, { backgroundColor: colors.primary, borderRadius: radius.full }]}>
                <MessageCircle size={17} color="#FFFFFF" fill="#FFFFFF" strokeWidth={1.5} />
              </View>
            </View>
          </View>

          <Text style={[typography.h2, styles.title, { color: colors.textPrimary, marginTop: spacing.lg }]}>
            {t('otp.screenTitle')}
          </Text>
          <Text style={[typography.bodySmall, styles.subtitle, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            {t('otp.subtitle')}
          </Text>

          <View style={[styles.phoneRow, { marginTop: spacing.xs, marginBottom: spacing.lg }]}>
            <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600' }]}>
              {formattedPhone}
            </Text>
            <AppPressable
              accessibilityRole="button"
              accessibilityLabel={t('otp.editPhone')}
              onPress={onEditPhone ?? onBack}
              hitSlop={8}>
              <Pencil size={18} color={colors.primary} strokeWidth={2} />
            </AppPressable>
          </View>

          <OtpBoxes
            value={otp}
            onChange={code => {
              setOtp(code.replace(/\D/g, '').slice(0, OTP_LENGTH));
              setVerifyError(false);
            }}
          />
          {verifyError ? (
            <Text style={[typography.caption, styles.verifyError, { color: colors.primary, marginTop: spacing.sm }]}>
              {t('otp.invalidStubCode')}
            </Text>
          ) : null}

          <View style={[styles.resendRow, { marginTop: spacing.lg, gap: spacing.xs }]}>
            <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>{t('otp.noCode')}</Text>
            <AppPressable
              accessibilityRole="button"
              disabled={secondsLeft > 0}
              onPress={onResend}
              hitSlop={8}>
              <Text style={[typography.bodySmall, { color: secondsLeft > 0 ? colors.textSecondary : colors.primary, fontWeight: '700' }]}>
                {timerLabel}
              </Text>
            </AppPressable>
          </View>

          {bookingSlot ? (
            <Text style={[typography.caption, styles.bookingHint, { color: colors.textSecondary, marginTop: spacing.sm }]}>
              {t('otp.bookingHint', { slot: bookingSlot })}
            </Text>
          ) : null}

          <AppPressable
            accessibilityRole="button"
            disabled={!isComplete}
            onPress={handleVerify}
            style={({ pressed }: { pressed: boolean }) => [
              styles.verifyButton,
              { borderRadius: radius.md, opacity: !isComplete ? 0.5 : pressed ? 0.88 : 1, marginTop: spacing.xl },
            ]}>
            <Text style={[typography.button, { color: '#FFFFFF', flex: 1, textAlign: 'center' }]}>
              {t('otp.verify')}
            </Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </AppPressable>

          <Text style={[typography.caption, styles.validity, { color: colors.textSecondary, marginTop: spacing.md }]}>
            {t('otp.validity')}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1 },
  header: { minHeight: 48, justifyContent: 'center' },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexGrow: 1 },
  brand: { alignItems: 'center' },
  brandMark: { width: 60, height: 60 },
  brandBook: { fontSize: 24, lineHeight: 27, textAlign: 'center' },
  brandSalon: { fontSize: 10, lineHeight: 14, fontWeight: '700', letterSpacing: 2 },
  illustrationWrap: { alignItems: 'center' },
  illustration: {
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  messageBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  verifyError: { textAlign: 'center' },
  phoneRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  resendRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' },
  bookingHint: { textAlign: 'center' },
  verifyButton: {
    minHeight: 56,
    paddingHorizontal: 18,
    backgroundColor: '#E85D4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  validity: { textAlign: 'center' },
});
