import { StyleSheet, View } from 'react-native';
import { Lock, Shield, Smartphone, Sparkles } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

/** Phone + shield illustration for OTP screen */
export default function OtpHero() {
  const { colors, radius } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.sparkleTL}>
        <Sparkles size={18} color={colors.primary + '55'} />
      </View>
      <View style={styles.sparkleTR}>
        <Sparkles size={14} color={colors.primary + '44'} />
      </View>
      <View style={styles.sparkleBL}>
        <Sparkles size={12} color={colors.primary + '33'} />
      </View>

      <View
        style={[
          styles.phone,
          {
            borderColor: colors.primary,
            borderRadius: radius.lg,
            backgroundColor: colors.card,
          },
        ]}>
        <Smartphone size={56} color={colors.primary} strokeWidth={1.5} />
        <View
          style={[
            styles.shield,
            {
              backgroundColor: colors.primary,
              borderRadius: radius.md,
            },
          ]}>
          <Shield size={28} color="#FFFFFF" fill={colors.primary} strokeWidth={1.5} />
          <Lock size={14} color="#FFFFFF" strokeWidth={2.5} style={styles.lock} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    marginBottom: 8,
  },
  phone: {
    width: 120,
    height: 140,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shield: {
    position: 'absolute',
    bottom: 24,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lock: {
    position: 'absolute',
    bottom: 10,
  },
  sparkleTL: { position: 'absolute', top: 20, left: '22%' },
  sparkleTR: { position: 'absolute', top: 32, right: '20%' },
  sparkleBL: { position: 'absolute', bottom: 28, left: '28%' },
});
