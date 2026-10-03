export type AppConfirmModalProps = {
  visible: boolean;

  title: string;
  message?: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => void;
  onCancel: () => void;

  icon?: React.ComponentType<any>;
};
