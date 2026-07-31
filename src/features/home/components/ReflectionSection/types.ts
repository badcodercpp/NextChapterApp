import { ImageSourcePropType } from 'react-native';

export interface ReflectionQuestion {
  id: string;
  title: string;
  question: string;
  description: string;
  duration: string;
  image: ImageSourcePropType;
}
