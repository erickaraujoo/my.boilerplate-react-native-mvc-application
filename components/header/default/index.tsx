import { Box, HStack, Menu, Pressable, Text } from 'native-base';
import { MaterialIconComponent } from 'components/icon';
import { Platform, StatusBar } from 'react-native';
import { PlatformPressableComponent } from 'components/platform-pressable';
import { clearStorageData, resolveRequestError } from 'utils';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { FC, ReactElement } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ParamListBase } from '@react-navigation/native';

interface Props {
  readonly title: string | undefined;
  readonly navigation?:
    | BottomTabNavigationProp<ParamListBase>
    | NativeStackNavigationProp<ParamListBase>;
  readonly disableBackButton?: boolean;
}

export const DefaultHeaderComponent: FC<Props> = ({
  title,
  navigation,
  disableBackButton = false
}) => {
  const showBackButton =
    typeof navigation !== 'undefined' && !disableBackButton && navigation.canGoBack();

  const handleLogout = async (): Promise<void> => {
    try {
      await clearStorageData();
    } catch (error) {
      resolveRequestError({ error });
    }
  };

  return (
    <Box
      bg={'local.blue.mid'}
      borderBottomRadius={'32px'}
      pt={StatusBar.currentHeight}
      shadow={'4'}
    >
      <HStack alignItems={'center'} p={'16px'} paddingBottom={'32px'} space={'16px'}>
        {showBackButton ? (
          <PlatformPressableComponent
            android_ripple={{ borderless: true }}
            hitSlop={Platform.select({
              default: { bottom: 16, left: 16, right: 16, top: 16 },
              ios: undefined
            })}
            icon={
              <MaterialIconComponent color={'local.white'} name={'chevron-left'} size={'24px'} />
            }
            onPress={(): void => navigation.goBack()}
            pressColor={'rgba(255, 255, 255, .32)'}
            style={{}}
          />
        ) : null}

        <Text
          color={'local.white'}
          flex={'1'}
          fontFamily={'PoppinsMedium'}
          fontSize={'16px'}
          mr={showBackButton ? '0px' : '-40px'}
          textAlign={'center'}
        >
          {typeof title === 'undefined' ? 'Title Here' : title}
        </Text>

        <HStack space={'8px'}>
          <Menu
            mr={'20px'}
            trigger={(triggerProps): ReactElement => (
              <Pressable
                rounded={'full'}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...triggerProps}
                _pressed={{ backgroundColor: 'rgba(255, 255, 255, .32)' }}
                p={'4px'}
              >
                <MaterialIconComponent color={'local.white'} name={'more-vert'} size={'24px'} />
              </Pressable>
            )}
          >
            <Menu.Item onPress={handleLogout}>
              <HStack alignItems={'center'} space={'8px'}>
                <MaterialIconComponent color={'local.grey.900'} name={'logout'} />
                <Text color={'local.grey.900'}>Sair</Text>
              </HStack>
            </Menu.Item>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
};
