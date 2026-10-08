import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check, CreditCard, Smartphone } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../components/common/AppPressable';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethods'>;

export default function PaymentMethodsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { paymentMethods, setDefaultPayment } = useAppData();

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('payment.title')} onBack={() => navigation.goBack()} />
      <Text style={[typography.bodySmall, { color: colors.textSecondary, paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        {t('payment.subtitle')}
      </Text>
      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: 40 }}>
        {paymentMethods.map(method => {
          const Icon = method.type === 'upi' ? Smartphone : CreditCard;
          return (
            <AppPressable
              key={method.id}
              onPress={() => setDefaultPayment(method.id)}
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: method.isDefault ? colors.primary : colors.border,
                  borderRadius: radius.md,
                  padding: spacing.md,
                },
              ]}>
              <View style={[styles.iconWrap, { backgroundColor: colors.primary + '14' }]}>
                <Icon size={20} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
                  {method.label}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
                  {method.detail}
                </Text>
              </View>
              {method.isDefault ? (
                <View style={styles.defaultBadge}>
                  <Check size={14} color={colors.primary} strokeWidth={2.5} />
                  <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>
                    {t('payment.default')}
                  </Text>
                </View>
              ) : null}
            </AppPressable>
          );
        })}
        <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
          {t('payment.addSoon')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
