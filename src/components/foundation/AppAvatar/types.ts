import { ImageSourcePropType } from 'react-native';

export interface AvatarProps {
  name?: string;

  uri?: string;

  source?: ImageSourcePropType;

  size?: number;

  onPress?: () => void;
}
