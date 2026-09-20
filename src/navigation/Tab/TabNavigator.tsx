import { AIChatNavigator } from '@/features/AIChat';
import { BottomTabBar } from '../components/CustomBottomTabBar';
import { HomeNavigator } from '@/features/home';
import { MentorChatNavigator } from '@/features/mentors/navigation';
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
          tabBarStyle: {
            display: 'none',
          },
        }}
        name={TabRoutes.AI}
        component={AIChatNavigator}
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
          title: t('app.locale.mentors'),
          tabBarStyle: {
            display: 'none',
          },
        }}
        name={TabRoutes.Mentor}
        component={MentorChatNavigator}
      />
    </Tab.Navigator>
  );
}
