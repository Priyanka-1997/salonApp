import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Check, Globe, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { i18n, persistLanguage } from '../../i18n/config';
import { APP_LANGUAGES, type AppLanguageCode } from '../../locales/languages';
import { useTheme } from '../../theme/useTheme';

type Props = {
  /** `icon` = header globe only; `row` = globe + label; `dropdownText` = text + chevron, no icon */
  variant?: 'icon' | 'row' | 'dropdownText';
  /** Use light text for transparent / gradient headers */
  triggerTone?: 'default' | 'light';
};

export default function LanguageSelector({ variant = 'icon', triggerTone = 'default' }: Props) {
  const { t } = useTranslation();
  const { colors, typography, spacing, radius } = useTheme();
  const [open, setOpen] = useState(false);

  const resolved = i18n.language?.split('-')[0] ?? 'en';

  const current = useMemo(
    () => APP_LANGUAGES.find(l => l.code === resolved) ?? APP_LANGUAGES[0],
    [resolved],
  );

  const select = useCallback(async (code: AppLanguageCode) => {
    await i18n.changeLanguage(code);
    await persistLanguage(code);
    setOpen(false);
  }, []);

  const triggerLabel = `${t('language.labelShort')}: ${current.nativeLabel}`;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('language.title')}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          variant === 'row'
            ? styles.rowTrigger
            : variant === 'dropdownText'
              ? styles.dropdownTrigger
              : styles.iconTrigger,
          { opacity: pressed ? 0.75 : 1 },
        ]}>
        {variant === 'dropdownText' ? (
          <Text
            style={[
              typography.bodySmall,
              {
                color: triggerTone === 'light' ? '#FFFFFF' : colors.textPrimary,
                fontWeight: '600',
              },
            ]}
            numberOfLines={1}>
            {triggerLabel} <Text style={{ opacity: 0.85 }}>▼</Text>
          </Text>
        ) : (
          <>
            <Globe color={colors.primary} size={variant === 'row' ? 22 : 24} strokeWidth={2} />
            {variant === 'row' ? (
              <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
                {current.nativeLabel}
              </Text>
            ) : null}
          </>
        )}
      </Pressable>

      <Modal visible={open} animationType="fade" transparent onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              {
                backgroundColor: colors.card,
                borderRadius: radius.lg,
                padding: spacing.lg,
              },
            ]}
            onPress={e => e.stopPropagation()}>
            <View style={[styles.sheetHeader, { marginBottom: spacing.md }]}>
              <Text style={[typography.h3, { color: colors.textPrimary, flex: 1 }]}>
                {t('language.choose')}
              </Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={12}>
                <X color={colors.textSecondary} size={22} strokeWidth={2} />
              </Pressable>
            </View>

            <FlatList
              data={APP_LANGUAGES}
              keyExtractor={item => item.code}
              ItemSeparatorComponent={() => (
                <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.border }} />
              )}
              renderItem={({ item }) => {
                const active = resolved === item.code;
                return (
                  <Pressable
                    style={({ pressed }) => [
                      styles.langRow,
                      {
                        paddingVertical: spacing.md,
                        opacity: pressed ? 0.85 : 1,
                        backgroundColor: active ? colors.primary + '18' : 'transparent',
                      },
                    ]}
                    onPress={() => select(item.code)}>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.body, { color: colors.textPrimary }]}>
                        {item.nativeLabel}
                      </Text>
                      <Text style={[typography.caption, { color: colors.textSecondary }]}>
                        {item.label}
                      </Text>
                    </View>
                    {active ? (
                      <Check color={colors.primary} size={22} strokeWidth={2.5} />
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconTrigger: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  dropdownTrigger: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 8,
    maxWidth: 240,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    maxHeight: '80%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
