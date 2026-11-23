import { AppPressableProps } from '../AppPressable';
import { AvatarSize } from './variants';
import { ImageSourcePropType } from 'react-native';
import { Ref } from 'react';

export interface AppAvatarPhotoActionsHandle {
  open: () => void;
}

export interface AppAvatarProps extends Omit<AppPressableProps, 'children'> {
  name?: string;

  uri?: string;

  source?: ImageSourcePropType;

  size?: AvatarSize;

  className?: string;

  onPress?: () => void;

  /**
   * Enables built-in View / Change photo actions.
   */
  enablePhotoActions?: boolean;

  /**
   * Imperative handle to open the photo actions modal from outside the avatar.
   */
  photoActionsRef?: Ref<AppAvatarPhotoActionsHandle>;
}
