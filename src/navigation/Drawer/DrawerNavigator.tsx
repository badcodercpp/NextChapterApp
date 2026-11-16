import { AboutScreen } from '@/features/About/screens';
import { CustomDrawer } from '../components/CustomDrawer';
import { DrawerParamList } from './DrawerParamList';
import { DrawerRoutes } from './DrawerRoutes';
import { HelpNavigator } from '@/features/Help/navigation';
import { NotificationScreen } from '@/features/Notification/screens';
import { ProfileNavigator } from '@/features/Profile';
import { RateUsNavigator } from '@/features/RateUs';
import { PremiumNavigator } from '@/features/Premium';
import { ReferToFriendNavigator } from '@/features/ReferToFriend';
import { SettingsNavigator } from '@/features/Settings/navigation';
import { TabNavigator } from '../Tab/TabNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen name={DrawerRoutes.Tabs} component={TabNavigator} />

      <Drawer.Screen name={DrawerRoutes.Profile} component={ProfileNavigator} />

      <Drawer.Screen
        name={DrawerRoutes.Settings}
        component={SettingsNavigator}
      />

      <Drawer.Screen
        name={DrawerRoutes.Notifications}
        component={NotificationScreen}
      />

      <Drawer.Screen name={DrawerRoutes.Help} component={HelpNavigator} />

      <Drawer.Screen name={DrawerRoutes.About} component={AboutScreen} />

      <Drawer.Screen name={DrawerRoutes.RateUs} component={RateUsNavigator} />
      <Drawer.Screen name={DrawerRoutes.Premium} component={PremiumNavigator} />

      <Drawer.Screen
        name={DrawerRoutes.ReferToFriend}
        component={ReferToFriendNavigator}
      />
    </Drawer.Navigator>
  );
}
