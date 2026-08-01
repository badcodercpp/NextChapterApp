import { ImageProps } from 'react-native';
import { LogoVariant } from './variants';

export interface AppLogoProps extends Omit<ImageProps, 'source'> {
  size?: number;

  variant?: LogoVariant;

  className?: string;
}
