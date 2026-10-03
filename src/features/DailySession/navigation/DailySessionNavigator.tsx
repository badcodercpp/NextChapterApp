import {
  DailySessionFollowUpStepScreen,
  DailySessionLandingScreen,
  DailySessionMissionStepScreen,
  DailySessionQuestionStepScreen,
  DailySessionReflectStepScreen,
} from '../screens';

import { DailySessionRoutes } from './DailySessionRoutes';
import { DailySessionStackParamList } from './DailySessionStackParamList';
import { NavigatorAppHeader } from '@/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<DailySessionStackParamList>();

export function DailySessionNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={DailySessionRoutes.DailySessionLanding}
        component={DailySessionLandingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={DailySessionRoutes.DailySessionQuestionStep}
        component={DailySessionQuestionStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={DailySessionRoutes.DailySessionFollowUpStep}
        component={DailySessionFollowUpStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={DailySessionRoutes.DailySessionMissionStep}
        component={DailySessionMissionStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={DailySessionRoutes.DailySessionReflectStep}
        component={DailySessionReflectStepScreen}
      />
    </Stack.Navigator>
  );
}
