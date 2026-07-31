import { ImageSourcePropType } from 'react-native';

export interface TodayInsight {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export interface TodayInsightSectionProps {
  insight: TodayInsight;
  onPress?: () => void;
}
