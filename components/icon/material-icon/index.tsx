import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import type { IIconProps } from 'native-base';

type Props = IIconProps & {
  readonly name: keyof typeof MaterialIcons.glyphMap;
};

export const MaterialIconComponent: FC<Props> = ({ name, ...rest }) => (
  <Icon as={MaterialIcons} name={name} {...rest} />
);
