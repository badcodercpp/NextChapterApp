import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

import { DrawerRoutes } from '@/navigation/Drawer/DrawerRoutes';
import { RootRoutes } from '@/navigation/RootStack/RootRoutes';
import { RootStackParamList } from '@/navigation/RootStack/RootStackParamList';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const resetToMain = () => {
  if (!navigationRef.isReady()) {
    console.log('Navigation is not ready');
    return;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: RootRoutes.Main,
          params: {
            screen: DrawerRoutes.Tabs,
            params: {
              screen: TabRoutes.Home,
            },
          },
        },
      ],
    }),
  );
};
