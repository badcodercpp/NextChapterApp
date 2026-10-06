export interface AppFileChooseModalProps {
  visible: boolean;

  title?: string;
  viewText?: string;
  changeText?: string;
  cancelText?: string;

  onView: () => void;
  onChange: () => void;
  onCancel: () => void;
  onDismiss?: () => void;

  showView?: boolean;
  showChange?: boolean;
}
