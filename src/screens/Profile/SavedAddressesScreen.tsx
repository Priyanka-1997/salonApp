import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MapPin, Plus, Trash2 } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppPressable from '../../components/common/AppPressable';
import Button from '../../components/common/Button';
import ScreenBackHeader from '../../components/common/ScreenBackHeader';
import { useAppData } from '../../hooks/useAppData';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedAddresses'>;

export default function SavedAddressesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const { addresses, setDefaultAddress, removeAddress, addAddress } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const onAdd = () => {
    if (!label.trim() || !line1.trim() || !city.trim()) {
      return;
    }
    addAddress({
      label: label.trim(),
      line1: line1.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      isDefault: addresses.length === 0,
    });
    setLabel('');
    setLine1('');
    setCity('');
    setPincode('');
    setShowForm(false);
  };

  const onRemove = (id: string) => {
    Alert.alert(t('addresses.removeTitle'), t('addresses.removeMessage'), [
      { text: t('common.goBack'), style: 'cancel' },
      { text: t('addresses.removeConfirm'), style: 'destructive', onPress: () => removeAddress(id) },
    ]);
  };

  return (
    <ScrollView style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenBackHeader title={t('addresses.title')} onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: 40 }}>
        {addresses.map(addr => (
          <AppPressable
            key={addr.id}
            onPress={() => setDefaultAddress(addr.id)}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: addr.isDefault ? colors.primary : colors.border,
                borderRadius: radius.md,
                padding: spacing.md,
              },
            ]}>
            <MapPin size={20} color={colors.primary} strokeWidth={2} />
            <View style={{ flex: 1 }}>
              <Text style={[typography.bodySmall, { color: colors.textPrimary, fontWeight: '700' }]}>
                {addr.label}
                {addr.isDefault ? ` · ${t('payment.default')}` : ''}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
                {addr.line1}, {addr.city} {addr.pincode}
              </Text>
            </View>
            <AppPressable onPress={() => onRemove(addr.id)} hitSlop={8}>
              <Trash2 size={18} color={colors.primaryDark} strokeWidth={2} />
            </AppPressable>
          </AppPressable>
        ))}

        {showForm ? (
          <View style={[styles.form, { borderColor: colors.border, borderRadius: radius.md, padding: spacing.md }]}>
            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder={t('addresses.labelPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, borderRadius: radius.sm }]}
            />
            <TextInput
              value={line1}
              onChangeText={setLine1}
              placeholder={t('addresses.linePlaceholder')}
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, borderRadius: radius.sm }]}
            />
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder={t('addresses.cityPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, borderRadius: radius.sm }]}
            />
            <TextInput
              value={pincode}
              onChangeText={setPincode}
              placeholder={t('addresses.pinPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, borderRadius: radius.sm }]}
            />
            <Button title={t('addresses.save')} onPress={onAdd} />
          </View>
        ) : (
          <AppPressable
            onPress={() => setShowForm(true)}
            style={[styles.addBtn, { borderColor: colors.primary, borderRadius: radius.md }]}>
            <Plus size={18} color={colors.primary} strokeWidth={2.5} />
            <Text style={[typography.bodySmall, { color: colors.primary, fontWeight: '600' }]}>
              {t('addresses.add')}
            </Text>
          </AppPressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, borderWidth: 1.5 },
  form: { borderWidth: StyleSheet.hairlineWidth, gap: 10 },
  input: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    paddingVertical: 14,
  },
});
