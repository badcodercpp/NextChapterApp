import { DrawerRoutes } from './DrawerRoutes';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TabParamList } from '../Tab/TabParamList';

export type DrawerParamList = {
  [DrawerRoutes.Tabs]: NavigatorScreenParams<TabParamList>;

  [DrawerRoutes.Settings]: undefined;

  [DrawerRoutes.Notifications]: undefined;

  [DrawerRoutes.Help]: undefined;

  [DrawerRoutes.About]: undefined;
};
