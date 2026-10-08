import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../components/common/AppPressable';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'HelpSupport'>;

const FAQ_KEYS = ['booking', 'cancel', 'payment', 'queue'] as const;

export default function HelpSupportScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const [openFaq, setOpenFaq] = useState<string | null>(FAQ_KEYS[0]);

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('help.title')} onBack={() => navigation.goBack()} />

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md, marginBottom: spacing.lg }}>
        <ContactRow
          icon={Phone}
          label={t('help.call')}
          value="+91 1800-123-4567"
          onPress={() => Linking.openURL('tel:+9118001234567')}
          colors={colors}
          typography={typography}
          radius={radius}
          spacing={spacing}
        />
        <ContactRow
          icon={Mail}
          label={t('help.email')}
          value="support@bookmysalon.app"
          onPress={() => Linking.openURL('mailto:support@bookmysalon.app')}
          colors={colors}
          typography={typography}
          radius={radius}
          spacing={spacing}
        />
        <ContactRow
          icon={MessageCircle}
          label={t('help.whatsapp')}
          value={t('help.whatsappAction')}
          onPress={() => Linking.openURL('https://wa.me/919876543210')}
          colors={colors}
          typography={typography}
          radius={radius}
          spacing={spacing}
        />
      </View>

      <Text style={[typography.h3, { color: colors.textPrimary, paddingHorizontal: spacing.lg, marginBottom: spacing.sm }]}>
        {t('help.faqTitle')}
      </Text>
      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: 40 }}>
        {FAQ_KEYS.map(key => {
          const open = openFaq === key;
          return (
            <View
              key={key}
              style={[
                styles.faqCard,
                { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md },
              ]}>
              <AppPressable onPress={() => setOpenFaq(open ? null : key)} style={styles.faqHead}>
                <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600', flex: 1 }]}>
                  {t(`help.faq.${key}.q`)}
                </Text>
                <ChevronDown
                  size={18}
                  color={colors.textSecondary}
                  style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
                />
              </AppPressable>
              {open ? (
                <Text style={[typography.caption, { color: colors.textSecondary, paddingHorizontal: 16, paddingBottom: 14, lineHeight: 20 }]}>
                  {t(`help.faq.${key}.a`)}
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  onPress,
  colors,
  typography,
  radius,
  spacing,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  onPress: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
  typography: ReturnType<typeof useTheme>['typography'];
  radius: ReturnType<typeof useTheme>['radius'];
  spacing: ReturnType<typeof useTheme>['spacing'];
}) {
  return (
    <AppPressable
      onPress={onPress}
      style={[
        styles.contact,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
        },
      ]}>
      <Icon size={20} color={colors.primary} strokeWidth={2} />
      <View style={{ flex: 1 }}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '600', marginTop: 2 }]}>
          {value}
        </Text>
      </View>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  contact: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: StyleSheet.hairlineWidth },
  faqCard: { borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  faqHead: { flexDirection: 'row', alignItems: 'center', padding: 16 },
});
