/* eslint-disable react/no-multi-comp */
import * as Constants from 'expo-constants';
import * as StatusBar from 'expo-status-bar';
import { Animated, LogBox, StyleSheet } from 'react-native';
import { DefaultHeaderComponent, HomeHeaderComponent } from 'components';
import { NativeBaseProvider } from 'native-base';
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
  PoppinsThin,
  SplashImage
} from 'assets';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SplashScreen, Stack } from 'expo-router';
import { firstIndex, nativeBaseCustomTheme } from 'utils';
import { ignoreLogs } from 'config';
import { useAssets } from 'expo-asset';
import { useEffect, useMemo, useState } from 'react';
import { useFonts } from 'expo-font';
import type { FC, ReactNode } from 'react';
import type { FontSource } from 'expo-font';

LogBox.ignoreLogs([ignoreLogs.SSRProvider, ignoreLogs.checboxGroupCallback]);

SplashScreen.preventAutoHideAsync();

interface AnimatedSplashScreenProps {
  readonly fonts: Record<string, FontSource>;
  readonly children: ReactNode;
}

const AnimatedSplashScreen: FC<AnimatedSplashScreenProps> = ({ fonts, children }) => {
  StatusBar.setStatusBarStyle('light');

  const [loaded, error] = useFonts(fonts);
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState<boolean>(false);
  const [splashImage, setSplashImage] = useState<string | null>(null);
  const [splashAsset] = useAssets([SplashImage]);
  const initialAnimatedValue = 1;
  const animation = useMemo(() => new Animated.Value(initialAnimatedValue), []);
  const backgroundColor = Constants.default.expoConfig?.splash?.backgroundColor;
  const resizeMode = Constants.default.expoConfig?.splash?.resizeMode;

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (typeof splashAsset !== 'undefined' && splashAsset[firstIndex])
      setSplashImage(splashAsset[firstIndex].localUri);
  }, [splashAsset]);

  useEffect(() => {
    if (loaded)
      Animated.timing(animation, { duration: 800, toValue: 0, useNativeDriver: true }).start(() =>
        setIsSplashAnimationComplete(true)
      );
  }, [animation, loaded]);

  if (splashImage === null) return null;

  SplashScreen.hideAsync();

  return (
    <>
      {loaded ? children : null}

      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents={'none'}
          style={[StyleSheet.absoluteFill, { backgroundColor, opacity: animation }]}
        >
          <Animated.Image
            fadeDuration={0}
            source={{ uri: splashImage }}
            style={{ height: '100%', resizeMode: resizeMode || 'contain', width: '100%' }}
          />
        </Animated.View>
      )}
    </>
  );
};

const Root: FC = () => (
  <AnimatedSplashScreen
    fonts={{
      PoppinsBold,
      PoppinsLight,
      PoppinsMedium,
      PoppinsRegular,
      PoppinsSemiBold,
      PoppinsThin
    }}
  >
    <NativeBaseProvider theme={nativeBaseCustomTheme}>
      <RootSiblingParent>
        <Stack
          initialRouteName={'index'}
          screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}
        >
          <Stack.Screen
            name={'index'}
            options={{ header: () => <HomeHeaderComponent />, headerTitle: 'Home' }}
          />

          <Stack.Screen name={'tab-navigation'} options={{ headerShown: false }} />

          <Stack.Screen
            name={'device-push-token'}
            options={{
              header: ({ options, navigation }) => (
                <DefaultHeaderComponent navigation={navigation} title={options.title} />
              ),
              headerTitle: 'Token'
            }}
          />
        </Stack>
      </RootSiblingParent>
    </NativeBaseProvider>
  </AnimatedSplashScreen>
);

export default Root;
