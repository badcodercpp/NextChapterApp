import { LucideIcon } from 'lucide-react-native';
import { TextInputProps } from 'react-native';

export interface AppInputRef {
  focus(): void;
  blur(): void;
  clear(): void;
}

export interface AppInputProps extends Omit<TextInputProps, 'editable'> {
  /**
   * Label displayed above the input.
   */
  label?: string;

  /**
   * Marks the field as required.
   */
  required?: boolean;

  /**
   * Helper text shown below the input.
   */
  helperText?: string;

  /**
   * Error message.
   * Overrides helperText when present.
   */
  error?: string;

  /**
   * Makes the input non-editable.
   */
  disabled?: boolean;

  /**
   * Read-only state.
   */
  readOnly?: boolean;

  /**
   * Shows ActivityIndicator on the right.
   */
  loading?: boolean;

  /**
   * Shows clear button when value exists.
   */
  clearable?: boolean;

  /**
   * Displays current/max characters.
   */
  showCharacterCount?: boolean;

  /**
   * Left icon.
   */
  startIcon?: LucideIcon;

  /**
   * Right icon.
   */
  endIcon?: LucideIcon;

  /**
   * Fired when right icon is pressed.
   */
  onEndIconPress?(): void;

  /**
   * Container class.
   */
  className?: string;

  /**
   * TextInput class.
   */
  inputClassName?: string;

  /**
   * Label class.
   */
  labelClassName?: string;

  /**
   * Helper text class.
   */
  helperTextClassName?: string;
}
