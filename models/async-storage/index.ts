export interface TokenAsyncStorageData {
  accessToken: string;
  refreshToken: string;
}

export interface UserAsyncStorageData {
  id: number;
  accessType: 'admin' | 'employee';
  name: string;
  userName: string;
}

export type AsyncStorageAllowedKeys = '@token' | '@user';

export interface AsyncStorageDataInput {
  key: AsyncStorageAllowedKeys;
  value: object | string;
}

export interface AsyncStorageGetValue {
  key: AsyncStorageAllowedKeys;
}
