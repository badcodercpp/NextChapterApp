import { AppPressableProps } from '../AppPressable';
import { AvatarSize } from './variants';
import { ImageSourcePropType } from 'react-native';

export interface AppAvatarProps extends Omit<AppPressableProps, 'children'> {
  name?: string;

  uri?: string;

  source?: ImageSourcePropType;

  size?: AvatarSize;

  className?: string;
}
