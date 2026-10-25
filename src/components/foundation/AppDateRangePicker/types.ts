export interface AppDateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange?: (startDate?: string, endDate?: string) => void;
  minDate?: string;
  maxDate?: string;
}
