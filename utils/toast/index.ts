import Toast from 'react-native-root-toast';
import type { ShowToastInput } from 'models';

export const showToast = ({ message, duration }: ShowToastInput): void =>
  Toast.show(message, {
    containerStyle: { borderRadius: 999, marginBottom: 40, paddingHorizontal: 20 },
    duration: duration ?? Toast.durations.SHORT,
    textStyle: { fontSize: 14 }
  });
