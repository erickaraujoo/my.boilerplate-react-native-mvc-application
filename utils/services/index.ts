import { AxiosError } from 'axios';
import { emptyArray, firstIndex } from '../default-values';
import { showToast } from '../toast';
import type { CustomAxiosError, ResolveRequestErrorInput } from 'models';

const badRequestStatus = 400;

export const resolveRequestError = ({ error, setRequestError }: ResolveRequestErrorInput): void => {
  if (error instanceof Error)
    if (error instanceof AxiosError) {
      const customError: CustomAxiosError = error;

      if (
        typeof customError.response !== 'undefined' &&
        typeof customError.response.data !== 'undefined'
      ) {
        if (
          customError.response.status === badRequestStatus &&
          customError.response.data.errors.length > emptyArray &&
          customError.response.data.errors[firstIndex]
        )
          showToast({ message: customError.response.data.errors[0].message });
        else if (typeof customError.response.data.message !== 'undefined')
          showToast({ message: customError.response.data.message });
      } else showToast({ message: 'Falha na conexão com servidor' });
    } else showToast({ message: 'Falha na conexão com servidor' });
  else showToast({ message: 'Falha na conexão com servidor' });

  if (typeof setRequestError !== 'undefined') setRequestError(true);
};
