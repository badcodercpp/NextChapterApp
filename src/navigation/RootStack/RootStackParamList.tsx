import { NavigatorScreenParams } from '@react-navigation/native';
import { RootRoutes } from './RootRoutes';
import { TabParamList } from '../Tab/TabParamList';

export type RootStackParamList = {
  [RootRoutes.Landing]: undefined;

  [RootRoutes.Auth]: undefined;

  [RootRoutes.Main]: NavigatorScreenParams<TabParamList>;

  [RootRoutes.Settings]: undefined;

  [RootRoutes.Premium]: {
    source?: string;
  };
};
