export interface HeaderSectionProps {
  userName: string;
  greeting?: string;
  subtitle?: string;
  avatarUrl?: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}
