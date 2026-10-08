import { Platform, type ViewStyle } from 'react-native';

/**
 * Hand cursor on **web only**. React Native Android/iOS ignore `cursor` — there is no
 * mouse pointer on phones; use `AppPressable` for ripple + pressed opacity instead.
 */
export const pointerCursor: ViewStyle =
  Platform.OS === 'web' ? { cursor: 'pointer' } : {};
