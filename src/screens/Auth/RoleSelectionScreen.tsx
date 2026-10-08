import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  type ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check, Scissors, Store, UserRound, Wind } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../components/common/AppPressable';
import { images } from '../../constants/images';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { getColors } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;
type Role = 'customer' | 'owner';

type RoleCardProps = {
  Icon: LucideIcon;
  photo: ImageSourcePropType;
  title: string;
  description: string;
  features: string[];
  role: Role;
  selected: boolean;
  onPress: () => void;
};

function RoleCard({
  Icon,
  photo,
  title,
  description,
  features,
  role,
  selected,
  onPress,
}: RoleCardProps) {
  const { typography, spacing, radius } = useTheme();
  const colors = getColors('light');
  const tint = role === 'customer' ? colors.primary : colors.success;
  const background = selected
    ? role === 'customer' ? '#FFF1ED' : '#F1F8F3'
    : colors.card;

  return (
    <AppPressable
      accessibilityRole="radio"
      accessibilityLabel={`${title}. ${description}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.roleCard,
        {
          backgroundColor: background,
          borderColor: selected ? tint : colors.border,
          borderRadius: radius.lg,
          opacity: pressed ? 0.94 : 1,
        },
        selected && styles.roleCardSelected,
      ]}>
      <Image source={photo} style={styles.cardPhoto} resizeMode="contain" accessibilityIgnoresInvertColors />
      <View style={[styles.cardContent, { padding: spacing.lg }]}>
        <View style={styles.cardTop}>
          <View style={[styles.iconCircle, { backgroundColor: tint + '18', borderRadius: radius.full }]}>
            <Icon size={20} color={tint} strokeWidth={2} />
          </View>
        </View>

        <Text style={[typography.h3, styles.roleTitle, { color: colors.textPrimary, marginTop: spacing.md }]}>
          {title}
        </Text>
        <Text
          style={[typography.caption, styles.roleDescription, { color: colors.textSecondary, marginTop: spacing.sm }]}
          numberOfLines={2}>
          {description}
        </Text>

        <View style={[styles.features, { marginTop: spacing.md, gap: spacing.sm }]}>
          {features.map(feature => (
            <View key={feature} style={styles.featureRow}>
              <View style={[styles.featureCheck, { backgroundColor: tint + '1C' }]}>
                <Check size={11} color={tint} strokeWidth={2.6} />
              </View>
              <Text
                style={[typography.caption, styles.featureText, { color: colors.textPrimary }]}
                numberOfLines={1}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </AppPressable>
  );
}

export default function RoleSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { typography, spacing } = useTheme();
  const colors = getColors('light');
  const [selectedRole, setSelectedRole] = useState<Role>('customer');

  const handleContinue = () => {
    if (selectedRole === 'customer') {
      navigation.replace('CustomerLogin');
      return;
    }

    navigation.replace('ShopkeeperLogin');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }]}>
        <View style={styles.brand}>
          <Scissors size={20} color={colors.primary} style={styles.decorScissors} />
          <Wind size={20} color={colors.primary + '77'} style={styles.decorSparkles} />
          <Image source={images.appIcon} style={styles.brandMark} resizeMode="contain" accessibilityIgnoresInvertColors />
          <Text style={[typography.h2, styles.brandBook, { color: colors.textPrimary }]}>
            B<Text style={{ color: colors.primary }}>OO</Text>K
          </Text>
          <Text style={[typography.label, styles.brandSalon, { color: colors.primary }]}>MY SALON</Text>
        </View>

        <Text style={[typography.h2, styles.heading, { color: colors.textPrimary, marginTop: spacing.xs }]}>
          {t('roleSelection.title')}
        </Text>
        <Text style={[typography.bodySmall, styles.subHeading, { color: colors.textSecondary, marginTop: spacing.sm }]}>
          {t('roleSelection.subtitle')}
        </Text>

        <View style={[styles.cards, { gap: spacing.lg, marginTop: spacing.lg }]}>
          <RoleCard
            Icon={UserRound}
            photo={images.roleCustomer}
            title={t('roleSelection.customer')}
            description={t('roleSelection.customerDesc')}
            features={[
              t('roleSelection.customerFeature1'),
              t('roleSelection.customerFeature2'),
              t('roleSelection.customerFeature3'),
            ]}
            role="customer"
            selected={selectedRole === 'customer'}
            onPress={() => setSelectedRole('customer')}
          />
          <RoleCard
            Icon={Store}
            photo={images.roleOwner}
            title={t('roleSelection.shopkeeper')}
            description={t('roleSelection.shopkeeperDesc')}
            features={[
              t('roleSelection.ownerFeature1'),
              t('roleSelection.ownerFeature2'),
              t('roleSelection.ownerFeature3'),
            ]}
            role="owner"
            selected={selectedRole === 'owner'}
            onPress={() => setSelectedRole('owner')}
          />
        </View>

        <AppPressable
          accessibilityRole="button"
          onPress={handleContinue}
          style={({ pressed }: { pressed: boolean }) => [
            styles.continueButton,
            { borderRadius: spacing.md, marginTop: spacing.lg },
            { opacity: pressed ? 0.88 : 1 },
          ]}>
          <Svg pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="roleContinueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={colors.primary} />
                <Stop offset="100%" stopColor="#FF846D" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#roleContinueGradient)" />
          </Svg>
          <Text style={[typography.button, styles.continueText, { color: '#FFFFFF' }]}>
            {t('roleSelection.continue')}
          </Text>
          <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
        </AppPressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingTop: 4,
  },
  brand: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    position: 'relative',
  },
  brandMark: {
    width: 100,
    height: 100,
  },
  brandBook: {
    fontSize: 30,
    lineHeight: 34,
    textAlign: 'center',
  },
  brandSalon: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  decorScissors: {
    position: 'absolute',
    left: 4,
    top: 34,
    opacity: 0.32,
    transform: [{ rotate: '-22deg' }],
  },
  decorSparkles: {
    position: 'absolute',
    right: 8,
    top: 50,
    opacity: 0.45,
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
  },
  subHeading: {
    textAlign: 'center',
  },
  cards: {
    width: '100%',
  },
  roleCard: {
    position: 'relative',
    minHeight: 224,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  roleCardSelected: {
    borderWidth: 1.5,
  },
  cardPhoto: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '52%',
    borderTopLeftRadius: 74,
    borderBottomLeftRadius: 74,
  },
  cardContent: {
    width: '58%',
    zIndex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 18,
    lineHeight: 23,
  },
  roleDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  features: {
    alignSelf: 'stretch',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 10,
    lineHeight: 14,
    flexShrink: 1,
  },
  continueButton: {
    minHeight: 48,
    paddingHorizontal: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  continueText: {
    flex: 1,
    textAlign: 'center',
  },
});