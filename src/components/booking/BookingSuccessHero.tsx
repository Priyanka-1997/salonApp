import { StyleSheet, View } from 'react-native';
import { Check, Sparkles } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

export default function BookingSuccessHero() {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={[styles.ring, styles.ringOuter, { borderColor: colors.success + '18' }]} />
      <View style={[styles.ring, styles.ringMid, { borderColor: colors.success + '30' }]} />
      <View style={[styles.badge, { backgroundColor: colors.success, shadowColor: colors.success }]}>
        <Check size={40} color="#FFFFFF" strokeWidth={3} />
      </View>
      <View style={[styles.confetti, styles.c1, { backgroundColor: colors.success }]} />
      <View style={[styles.confetti, styles.c2, { backgroundColor: colors.accent }]} />
      <View style={[styles.confetti, styles.c3, { backgroundColor: colors.success + '88' }]} />
      <View style={styles.sparkleL}>
        <Sparkles size={16} color={colors.success + '66'} />
      </View>
      <View style={styles.sparkleR}>
        <Sparkles size={14} color={colors.accent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginBottom: 16,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
  },
  ringOuter: {
    width: 130,
    height: 130,
  },
  ringMid: {
    width: 108,
    height: 108,
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  c1: { top: 24, left: '28%' },
  c2: { top: 18, right: '26%' },
  c3: { bottom: 30, right: '32%' },
  sparkleL: { position: 'absolute', left: '22%', bottom: 28 },
  sparkleR: { position: 'absolute', right: '20%', top: 32 },
});
