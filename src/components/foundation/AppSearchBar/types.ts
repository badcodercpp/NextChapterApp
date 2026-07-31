import { AppInputProps } from '../AppInput';

export interface AppSearchBarProps
  extends Omit<
    AppInputProps,
    | 'label'
    | 'helperText'
    | 'error'
    | 'required'
    | 'multiline'
    | 'showCharacterCount'
  > {
  showFilter?: boolean;

  onFilterPress?: () => void;
}
