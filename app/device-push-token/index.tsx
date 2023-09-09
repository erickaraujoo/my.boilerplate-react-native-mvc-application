import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';
import { HStack, IconButton, ScrollView, Text, VStack } from 'native-base';
import { MaterialIconComponent } from 'components';
import { MaterialIcons } from '@expo/vector-icons';
import { showToast } from 'utils';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

const Page: FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const setTextOnClipboard = async ({ value }: { value: string }): Promise<void> => {
    await Clipboard.setStringAsync(value);

    showToast({ message: 'Copiado para Área de Transferência' });
  };

  const getDevicePushToken = async (): Promise<void> => {
    const tokenData = (await Notifications.getDevicePushTokenAsync()).data;

    setToken(tokenData);
  };

  useEffect(() => {
    getDevicePushToken();
  }, []);

  if (token === null) return null;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
      <VStack flex={'1'} pt={'16px'} space={'16px'}>
        <Text color={'local.blue.mid'} fontFamily={'PoppinsMedium'} fontSize={'16px'} px={'20px'}>
          Token de Notificação
        </Text>

        <VStack px={'20px'}>
          <HStack
            alignItems={'center'}
            bg={'local.white'}
            p={'16px'}
            rounded={'4'}
            shadow={'4'}
            space={'16px'}
          >
            <VStack flex={'1'} space={'8px'}>
              <Text
                color={'local.grey.900'}
                fontFamily={'PoppinsRegular'}
                fontSize={'12px'}
                noOfLines={3}
              >
                {token}
              </Text>
            </VStack>

            <IconButton
              as={MaterialIcons}
              icon={<MaterialIconComponent color={'local.blue.mid'} name={'content-copy'} />}
              onPress={(): Promise<void> => setTextOnClipboard({ value: token })}
              rounded={'4'}
            />
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
