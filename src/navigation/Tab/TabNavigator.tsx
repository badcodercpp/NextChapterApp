import { BottomTabBar } from '../components/CustomBottomTabBar';
import { HomeNavigator } from '@/features/home';
import { TabParamList } from './TabParamList';
import { TabRoutes } from './TabRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={BottomTabBar}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          title: t('app.locale.home'),
        }}
        name={TabRoutes.Home}
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: t('app.locale.journal'),
        }}
        name={TabRoutes.Journal}
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: t('app.locale.ai'),
        }}
        name={TabRoutes.AI}
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: t('app.locale.progress'),
        }}
        name={TabRoutes.Progress}
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: t('app.locale.profile'),
        }}
        name={TabRoutes.Profile}
        component={HomeNavigator}
      />
    </Tab.Navigator>
  );
}
