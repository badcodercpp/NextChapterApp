import { ImageSourcePropType } from 'react-native';

export interface JournalListHeaderProps {
  title?: string;
  subtitle?: string;

  avatar?: ImageSourcePropType;

  onAvatarPress?: () => void;
}
