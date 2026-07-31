export interface JournalSearchBarProps {
  value: string;
  placeholder?: string;

  onChangeText: (text: string) => void;

  onFilterPress?: () => void;
}
