import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { LucideIcon } from 'lucide-react-native';

export interface AppInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface AppInputProps extends TextInputProps {
  /**
   * Label displayed above the input.
   */
  label?: string;

  /**
   * Shows a red asterisk.
   */
  required?: boolean;

  /**
   * Helper text shown below input.
   */
  helperText?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Makes input non-editable with disabled styling.
   */
  disabled?: boolean;

  /**
   * Makes input non-editable but keeps normal appearance.
   */
  readOnly?: boolean;

  /**
   * Shows ActivityIndicator.
   */
  loading?: boolean;

  /**
   * Shows clear button automatically.
   */
  clearable?: boolean;

  /**
   * Displays character count.
   */
  showCharacterCount?: boolean;

  /**
   * Maximum character count.
   */
  characterLimit?: number;

  /**
   * Left icon component.
   */
  startIcon?: LucideIcon;

  /**
   * Right icon component.
   */
  endIcon?: LucideIcon;

  /**
   * Called when right icon is pressed.
   */
  onEndIconPress?: () => void;

  /**
   * Root container style.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Input wrapper style.
   */
  inputContainerStyle?: StyleProp<ViewStyle>;

  /**
   * TextInput style.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Label style.
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Helper/Error style.
   */
  helperTextStyle?: StyleProp<TextStyle>;
}
