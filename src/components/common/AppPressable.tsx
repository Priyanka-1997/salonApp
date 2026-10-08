import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { pointerCursor } from '../../theme/interaction';
import { useTheme } from '../../theme/useTheme';

type Props = PressableProps & {
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
};

/**
 * Pressable with `cursor: pointer` on web and ripple + opacity on native.
 * Note: Android/iOS have no mouse cursor — touch feedback replaces the pointer hand.
 */
export default function AppPressable({ style, disabled, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      disabled={disabled}
      android_ripple={disabled ? undefined : { color: colors.primary + '24', borderless: false }}
      style={state => {
        const base = [pointerCursor, typeof style === 'function' ? style(state) : style];
        if (state.pressed && !disabled) {
          base.push({ opacity: 0.88 });
        }
        return base;
      }}
      {...rest}
    />
  );
}
