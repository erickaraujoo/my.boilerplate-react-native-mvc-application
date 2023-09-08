export const errorDateSchema = (): string => 'Este campo deve ser uma data';
export const errorNumberSchema = (): string => 'Este campo deve ser um número';
export const errorRequiredSchema = (): string => 'Este campo é obrigatório';
export const errorMoreThenZeroSchema = (): string => 'Este campo deve ser maior que zero';

export const asyncStorageErrorMessage = 'Falha durante conexão com armazenamento';

export const apiConfig = {
  baseURL: '',
  baseURLImage: ''
};

export const apiRoutes = {};

export const ignoreLogs = {
  SSRProvider:
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
  checboxGroupCallback:
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320'
};

export const modalFooterConfirmProps = {
  danger: {
    bg: 'local.red.veryLight',
    bgOnPress: 'local.red.superLight',
    tintColor: 'local.red.mid'
  }
};
