import { HStack, Pressable, Text } from 'native-base';
import { MaterialIconComponent } from 'components/icon';
import { useRouter } from 'expo-router';
import type { FC, ReactElement } from 'react';
import type { Route } from 'expo-router';

interface Props {
  readonly href: Route<string>;
  readonly title: string;
}

export const HomeCardComponent: FC<Props> = ({ href, title }) => {
  const defaultScale = 1;
  const scaleOnPress = 0.96;
  const router = useRouter();

  return (
    <Pressable onPress={(): void => router.push<string>(href)}>
      {({ isPressed }): ReactElement => (
        <HStack
          alignItems={'center'}
          bg={'local.white'}
          p={'16px'}
          rounded={'4'}
          shadow={'4'}
          space={'16px'}
          style={{ transform: [{ scale: isPressed ? scaleOnPress : defaultScale }] }}
        >
          <Text color={'local.blue.mid'} flex={'1'} fontFamily={'PoppinsMedium'}>
            {title}
          </Text>

          <MaterialIconComponent color={'local.blue.mid'} name={'chevron-right'} size={'24px'} />
        </HStack>
      )}
    </Pressable>
  );
};
