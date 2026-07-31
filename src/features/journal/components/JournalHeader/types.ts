import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface JournalHeaderProps {
  title: string;

  onClose: () => void;
  onSave: () => void;

  saveText?: string;
  saveDisabled?: boolean;
  saveLoading?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
