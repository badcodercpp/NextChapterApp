export interface AppImagePreviewModalProps {
  visible: boolean;
  uri: string;

  title?: string;
  message?: string;

  cancelText?: string;
  confirmText?: string;

  onCancel?: () => void;
  onConfirm: () => void;

  loading?: boolean;
}
