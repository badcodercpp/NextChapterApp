import {
  CreateAccountScreen,
  CreatePasswordScreen,
  ForgotPasswordScreen,
  HowAreYouFeelingScreen,
  HowLongHasItBeenScreen,
  LandingScreen,
  LoginScreen,
  MeetYourAIScreen,
  RecoveryStartsTodayScreen,
  ReminderScreen,
  VerifyEmailScreen,
  VerifyIdentityScreen,
  WhatBringsYouHereScreen,
  WhatWouldYouLikeHelpWithScreen,
} from '../screens';

import { LandingRoutes } from './LandingRoutes';
import { LandingStackParamList } from './LandingStackParamList';
import { NavigatorAppHeader } from '@/components/foundation/AppHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<LandingStackParamList>();

export function LandingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: NavigatorAppHeader,
      }}
    >
      <Stack.Screen
        name={LandingRoutes.Landing}
        component={LandingScreen}
        options={{
          title: 'Landing',
        }}
      />
      <Stack.Screen
        name={LandingRoutes.WhatBringsYouHere}
        component={WhatBringsYouHereScreen}
        options={{
          title: 'What brings you here?',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.HowLongHasItBeen}
        component={HowLongHasItBeenScreen}
        options={{
          title: 'How long has it been?',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.HowAreYouFeeling}
        component={HowAreYouFeelingScreen}
        options={{
          title: 'How are you feeling today?',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.WhatWouldYouLikeHelpWith}
        component={WhatWouldYouLikeHelpWithScreen}
        options={{
          title: 'What would you like help with?',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.MeetYourAI}
        component={MeetYourAIScreen}
        options={{
          title: 'Meet your AI !!',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.CreateAccount}
        component={CreateAccountScreen}
        options={{
          title: 'Create account',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.Reminder}
        component={ReminderScreen}
        options={{
          title: 'Reminder',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.RecoveryStartsToday}
        component={RecoveryStartsTodayScreen}
        options={{
          title: 'Reminder',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.Login}
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.CreatePassword}
        component={CreatePasswordScreen}
        options={{
          title: 'Create password',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.VerifyEmail}
        component={VerifyEmailScreen}
        options={{
          title: 'Verify email',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.ForgotPassword}
        component={ForgotPasswordScreen}
        options={{
          title: 'Forgot password',
        }}
      />

      <Stack.Screen
        name={LandingRoutes.VerifyIdentity}
        component={VerifyIdentityScreen}
        options={{
          title: 'Verify identity',
        }}
      />
    </Stack.Navigator>
  );
}
