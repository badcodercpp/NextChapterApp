import { AppInputProps, AppInputRef } from '../AppInput';

export interface AppSearchBarProps extends Omit<AppInputProps, 'startIcon'> {
  showFilter?: boolean;

  onFilterPress?(): void;
}

export type { AppInputRef };
