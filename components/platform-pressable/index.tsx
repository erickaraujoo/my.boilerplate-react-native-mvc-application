/* eslint-disable @typescript-eslint/no-magic-numbers */
import { PlatformPressable } from '@react-navigation/elements';
import type { FC, ReactNode } from 'react';
import type { Props as IPlatformPressable } from '@react-navigation/elements/src/PlatformPressable';

type Props = Omit<IPlatformPressable, 'children'> & {
  readonly isBorder?: boolean;
  readonly icon: ReactNode;
};

export const PlatformPressableComponent: FC<Props> = ({
  android_ripple: androidRipple,
  isBorder,
  accessibilityRole,
  accessible,
  icon,
  style,
  ...rest
}) => (
  <PlatformPressable
    accessibilityRole={accessibilityRole ?? 'button'}
    accessible={accessible ?? true}
    android_ripple={androidRipple ?? { borderless: isBorder ?? false, radius: isBorder ? 18 : 24 }}
    style={style ?? { backgroundColor: '#F3F5F9', borderRadius: isBorder ? 999 : 4, padding: 8 }}
    {...rest}
  >
    {icon}
  </PlatformPressable>
);
