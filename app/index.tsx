import { HStack, Pressable, ScrollView, Text, VStack } from 'native-base';
import { MaterialIconComponent } from 'components';
import { useRouter } from 'expo-router';
import type { FC, ReactElement } from 'react';

const Page: FC = () => {
  const defaultScale = 1;
  const scaleOnPress = 0.96;
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
      <VStack flex={'1'} pt={'16px'} space={'16px'}>
        <Text color={'local.blue.mid'} fontFamily={'PoppinsMedium'} fontSize={'16px'} px={'20px'}>
          Início
        </Text>

        <VStack px={'20px'} space={'12px'}>
          <Pressable onPress={(): void => router.push<string>('/tab-navigation/')}>
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
                <VStack flex={'1'} space={'8px'}>
                  <Text color={'local.blue.mid'} fontFamily={'PoppinsRegular'}>
                    Tab Navigation
                  </Text>
                </VStack>

                <MaterialIconComponent
                  color={'local.blue.mid'}
                  name={'chevron-right'}
                  size={'36px'}
                />
              </HStack>
            )}
          </Pressable>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
