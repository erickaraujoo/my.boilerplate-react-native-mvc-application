import { ScrollView, Text, VStack } from 'native-base';
import type { FC } from 'react';

const Page: FC = () => (
  <ScrollView contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
    <VStack flex={'1'} pt={'16px'} space={'16px'}>
      <Text color={'local.blue.mid'} fontFamily={'PoppinsMedium'} fontSize={'16px'} px={'20px'}>
        Página 2
      </Text>
    </VStack>
  </ScrollView>
);

export default Page;
