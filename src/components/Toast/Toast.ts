export type ToastType = 'success' | 'error' | 'info';

type ToastListener = (
  message: string,
  type: ToastType,
  duration?: number,
) => void;

let toastListener: ToastListener | null = null;

export const registerToastListener = (listener: ToastListener | null) => {
  toastListener = listener;
};

export const showToast = (
  message: string,
  type: ToastType = 'info',
  duration = 3000,
) => {
  toastListener?.(message, type, duration);
};
