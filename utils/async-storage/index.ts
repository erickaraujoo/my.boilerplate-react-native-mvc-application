import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AsyncStorageDataInput, AsyncStorageGetValue } from 'models';

export const setStorageData = async ({ key, value }: AsyncStorageDataInput): Promise<void> => {
  if (typeof value === 'object') {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);
  } else await AsyncStorage.setItem(key, value);
};

export const getStorageData = async ({
  key
}: AsyncStorageGetValue): Promise<object | string | null> => {
  const value: object | string | null = await AsyncStorage.getItem(key);

  if (value === null) return null;

  if (typeof JSON.parse(value) === 'object') {
    const jsonValue = JSON.parse(value) as object;

    return jsonValue;
  }

  return value;
};

export const clearStorageData = async (): Promise<void> => {
  await AsyncStorage.clear();
};
