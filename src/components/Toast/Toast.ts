// src/components/Toast/Toast.ts
type ToastType = 'success' | 'error' | 'info';

type ToastListener = (
  message: string,
  type: ToastType,
  duration?: number,
) => void;

let toastListener: ToastListener | null = null;

export const registerToastListener = (listener: ToastListener) => {
  toastListener = listener;
};

export const showToast = (
  message: string,
  type: ToastType = 'info',
  duration = 3000,
) => {
  if (toastListener) {
    toastListener(message, type, duration);
  }
};
