export type AppConfirmModalProps = {
  visible: boolean;

  title: string;
  message?: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => void;
  onCancel: () => void;

  onBackdropPress?: () => void;

  icon?: React.ComponentType<any>;
};
