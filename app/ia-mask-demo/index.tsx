/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable max-lines-per-function */
import * as jpeg from 'jpeg-js';
import { Button, Image, Input, ScrollView, Text, VStack } from 'native-base';
import { bundleResourceIO, fetch } from '@tensorflow/tfjs-react-native';
import { load } from '@tensorflow-models/blazeface';
import { loadLayersModel, ready, tensor3d } from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { BlazeFaceModel, NormalizedFace } from '@tensorflow-models/blazeface';
import type { FC } from 'react';
import type { LayersModel, Tensor3D } from '@tensorflow/tfjs';

const Page: FC = () => {
  const [imageLink, setImageLink] = useState(
    'https://raw.githubusercontent.com/ohyicong/masksdetection/master/dataset/with_mask/with-mask-default-mask-291.jpg'
  );
  const [isEnabled, setIsEnabled] = useState(true);
  const [faces, setFaces] = useState<
    {
      color: string;
      id: number;
      location: NormalizedFace | undefined;
    }[]
  >([]);
  const [maskDetector, setMaskDetector] = useState<LayersModel | null>(null);
  const [faceDetector, setFaceDetector] = useState<BlazeFaceModel | null>(null);

  const loadModel = async (): Promise<void> => {
    await ready();

    const modelJson = require('../../assets/model/model.json');
    const modelWeight = require('../../assets/model/group1-shard.bin');

    const tfMaskDetector = await loadLayersModel(bundleResourceIO(modelJson, modelWeight));
    const tfFaceDetector = await load();

    setMaskDetector(tfMaskDetector);
    setFaceDetector(tfFaceDetector);
  };

  useEffect(() => {
    loadModel();
  }, []);

  const imageToTensor = (rawImageData: jpeg.BufferLike): Tensor3D => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, { useTArray: TO_UINT8ARRAY });
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;

    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }

    return tensor3d(buffer, [width, height, 3]);
  };

  const getFaces = async (): Promise<void> => {
    try {
      if (faceDetector === null || maskDetector === null) return;

      const response = await fetch(imageLink, {}, { isBinary: true });

      const rawImageData = await response.arrayBuffer();

      const imageTensor = imageToTensor(rawImageData).resizeBilinear<Tensor3D>([224, 224]);

      const currentFaces = await faceDetector.estimateFaces(imageTensor, false);

      const tempArray: {
        color: string;
        id: number;
        location: NormalizedFace | undefined;
      }[] = [];

      for (let i = 0; i < currentFaces.length; i += 1) {
        let color = 'red';
        const width = parseInt(currentFaces[i].bottomRight[1] - currentFaces[i].topLeft[1], 10);
        const height = parseInt(currentFaces[i].bottomRight[0] - currentFaces[i].topLeft[0], 10);

        let faceTensor = imageTensor.slice(
          [parseInt(currentFaces[i].topLeft[1], 10), parseInt(currentFaces[i].topLeft[0], 10), 0],
          [width, height, 3]
        );

        faceTensor = faceTensor.resizeBilinear([224, 224]).reshape([1, 224, 224, 3]);

        const result = await maskDetector.predict(faceTensor).data();

        if (result[0] > result[1]) color = 'green';

        tempArray.push({ color, id: i, location: currentFaces[i] });
      }

      setFaces(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

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
          <Input
            onChangeText={(inputText): void => {
              setImageLink(inputText);
              const elements = inputText.split('.');

              if (elements.slice(-1)[0] === 'jpg' || elements.slice(-1)[0] === 'jpeg')
                setIsEnabled(true);
              else setIsEnabled(false);
            }}
            placeholder={'Image link'}
            value={imageLink}
          />

          <VStack alignItems={'center'} flex={'1'} space={'16px'}>
            <Image
              alt={'teste'}
              borderColor={'black'}
              borderWidth={2}
              h={'224'}
              resizeMode={'contain'}
              source={{ uri: imageLink }}
              w={'224'}
            />

            <Svg height={'224'} style={{ marginTop: -224 }} width={'224'}>
              {faces.map((face) => (
                <Rect
                  key={face.id}
                  fill={''}
                  height={face.location.bottomRight[1] - face.location.topLeft[1]}
                  stroke={face.color}
                  strokeWidth={'3'}
                  width={face.location.bottomRight[0] - face.location.topLeft[0]}
                  x={face.location.topLeft[0]}
                  y={face.location.topLeft[1]}
                />
              ))}
            </Svg>
          </VStack>

          <Button
            disabled={!isEnabled}
            isLoading={!isEnabled}
            onPress={(): void => {
              getFaces();
            }}
          >
            <Text>Predict</Text>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Page;
