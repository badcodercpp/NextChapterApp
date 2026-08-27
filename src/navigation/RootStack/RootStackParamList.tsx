import { LandingStackParamList } from '@/features/Landing/navigation/LandingStackParamList';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootRoutes } from './RootRoutes';
import { TabParamList } from '../Tab/TabParamList';

export type RootStackParamList = {
  [RootRoutes.LandingStack]: NavigatorScreenParams<LandingStackParamList>;

  [RootRoutes.Main]: NavigatorScreenParams<TabParamList>;
};
