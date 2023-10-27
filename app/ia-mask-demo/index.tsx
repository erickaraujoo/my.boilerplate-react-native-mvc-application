/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
import { ScrollView, Text, VStack } from 'native-base';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { loadLayersModel, ready } from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { LayersModel } from '@tensorflow/tfjs';

const Page: FC = () => {
  const [maskDetector, setMaskDetector] = useState<LayersModel | null>(null);

  const loadModel = async (): Promise<void> => {
    await ready();

    const modelJson = require('../../assets/model/csense-model/model.json');
    const modelWeight = require('../../assets/model/csense-model/group1-shard.bin');

    const tfMaskDetector = await loadLayersModel(bundleResourceIO(modelJson, modelWeight));

    setMaskDetector(tfMaskDetector);
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    if (maskDetector !== null) console.log(maskDetector);
  }, [maskDetector]);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={'1'} pt={'16px'} space={'16px'}>
        <Text color={'local.blue.mid'} fontFamily={'PoppinsMedium'} fontSize={'16px'} px={'20px'}>
          IA - Presença de Máscara (Demo)
        </Text>

        <VStack flex={'1'} px={'20px'} space={'16px'}>
          <Text>Texto aqui...</Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
