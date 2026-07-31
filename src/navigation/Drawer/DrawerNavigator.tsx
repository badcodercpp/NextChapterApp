import { AboutScreen } from '@/features/About/screens';
import { CustomDrawer } from '../components/CustomDrawer';
import { DrawerParamList } from './DrawerParamList';
import { DrawerRoutes } from './DrawerRoutes';
import { HelpScreen } from '@/features/Help/screens';
import { NotificationScreen } from '@/features/Notification/screens';
import { SettingsScreen } from '@/features/Settings/screens';
import { TabNavigator } from '../Tab/TabNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen name={DrawerRoutes.Tabs} component={TabNavigator} />

      <Drawer.Screen name={DrawerRoutes.Settings} component={SettingsScreen} />

      <Drawer.Screen
        name={DrawerRoutes.Notifications}
        component={NotificationScreen}
      />

      <Drawer.Screen name={DrawerRoutes.Help} component={HelpScreen} />

      <Drawer.Screen name={DrawerRoutes.About} component={AboutScreen} />
    </Drawer.Navigator>
  );
}
