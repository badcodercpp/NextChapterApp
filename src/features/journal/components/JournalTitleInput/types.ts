import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface JournalTextFieldProps
  extends Pick<
    TextInputProps,
    | 'placeholder'
    | 'keyboardType'
    | 'autoCapitalize'
    | 'autoCorrect'
    | 'returnKeyType'
    | 'multiline'
    | 'numberOfLines'
    | 'editable'
  > {
  value: string;

  onChangeText: (text: string) => void;

  error?: string;

  maxLength?: number;

  style?: StyleProp<ViewStyle>;
}
