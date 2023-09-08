import type { AxiosError } from 'axios';
import type { Dispatch, SetStateAction } from 'react';

export type CustomAxiosError = AxiosError & {
  response?: { data: { message: string; errors: { message: string; param: string }[] } };
};

export interface ResolveRequestErrorInput {
  error: unknown;
  setRequestError?: Dispatch<SetStateAction<boolean>>;
}
