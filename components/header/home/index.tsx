import { Box, HStack, Menu, Pressable, Text, VStack } from 'native-base';
import { MaterialIconComponent } from 'components/icon';
import { StatusBar } from 'react-native';
import { asyncStorageErrorMessage } from 'config';
import { clearStorageData, getStorageData, resolveRequestError, showToast } from 'utils';
import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { UserAsyncStorageData } from 'models';

export const HomeHeaderComponent: FC = () => {
  const [name, setName] = useState<string | null>(null);

  const handleLogout = async (): Promise<void> => {
    try {
      await clearStorageData();
    } catch (error) {
      resolveRequestError({ error });
    }
  };

  const getUserInAsyncStorage = async (): Promise<void> => {
    try {
      const data = (await getStorageData({ key: '@user' })) as UserAsyncStorageData | null;

      if (data !== null) setName(data.name);

      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      showToast({ message: asyncStorageErrorMessage });
    }
  };

  useEffect(() => {
    getUserInAsyncStorage();
  }, []);

  return (
    <Box
      bg={'local.blue.mid'}
      borderBottomRadius={'32px'}
      pt={StatusBar.currentHeight}
      shadow={'4'}
    >
      <VStack p={'16px'} paddingBottom={'32px'} space={'16px'}>
        <HStack justifyContent={'flex-end'} space={'8px'}>
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

        <VStack>
          <Text color={'local.white'} fontSize={'30px'}>
            Olá.
          </Text>

          <Text color={'local.white'} fontSize={'18px'}>
            {name === null ? 'Name here' : name}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};
