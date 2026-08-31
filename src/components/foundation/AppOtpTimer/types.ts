export interface AppOtpTimerProps {
  minute: number;
  second: number;
  labeltext?: string;
  onResendPress?: () => void; // Optional callback to trigger your API logic
}
