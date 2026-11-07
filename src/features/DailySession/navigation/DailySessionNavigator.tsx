import {
  DailySessionCompleteStepScreen,
  DailySessionFollowUpStepScreen,
  DailySessionLandingScreen,
  DailySessionMissionStepScreen,
  DailySessionQuestionStepScreen,
  DailySessionReflectStepScreen,
} from '../screens';

import { DailySessionRoutes } from './DailySessionRoutes';
import { DailySessionStackParamList } from './DailySessionStackParamList';
import { AppIcon, NavigatorAppHeader, appHeaderOptions } from '@/components';
import { Check } from 'lucide-react-native';
import {
  DailySessionStatus,
  JourneyStatus,
  useActiveJourneyQuery,
  useActiveDailySessionQuery,
} from '@/__generated__/graphql';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AppState } from 'react-native';
import {
  selectActiveDailySession,
  selectActiveJourney,
  selectApplicationConfig,
} from '@/state/selectors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator<DailySessionStackParamList>();

export function DailySessionNavigator() {
  const { refetch: refetchJourney, isError: journeyError } =
    useActiveJourneyQuery();
  const { refetch: refetchSession, isError: sessionError } =
    useActiveDailySessionQuery();
  useFocusEffect(
    useCallback(() => {
      refetchJourney();
      refetchSession();
      const subscription = AppState.addEventListener('change', state => {
        if (state === 'active') {
          refetchJourney();
          refetchSession();
        }
      });
      return () => subscription.remove();
    }, [refetchJourney, refetchSession]),
  );
  const { data: session } = useSelector(selectActiveDailySession);
  const { data: journey } = useSelector(selectActiveJourney);
  const { data: config } = useSelector(selectApplicationConfig);
  const totalDays = config?.totalProgramDays;
  const programCompleted =
    journey?.status === JourneyStatus.Completed ||
    (totalDays != null &&
      session?.day === totalDays &&
      session.status === DailySessionStatus.Completed);
  const savedDay = journey?.currentDay ?? session?.day;
  const day =
    programCompleted && totalDays != null
      ? totalDays
      : savedDay == null
      ? undefined
      : totalDays == null
      ? savedDay
      : Math.min(savedDay, totalDays);
  const daySubtitle =
    journeyError || sessionError
      ? 'Unable to refresh journey progress'
      : day == null
      ? undefined
      : totalDays == null
      ? `Day ${day}`
      : `Day ${day} out of ${totalDays}`;
  const progressHeader = appHeaderOptions({
    subtitle: daySubtitle,
    headerSubtitleAccessory:
      programCompleted && !journeyError && !sessionError
        ? () => <AppIcon icon={Check} size={14} className="text-success" />
        : undefined,
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Daily Session',
            ...progressHeader,
          }),
        }}
        name={DailySessionRoutes.DailySessionLanding}
        component={DailySessionLandingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Daily Session',
            ...progressHeader,
          }),
        }}
        name={DailySessionRoutes.DailySessionQuestionStep}
        component={DailySessionQuestionStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Follow-up Conversation',
            ...progressHeader,
          }),
        }}
        name={DailySessionRoutes.DailySessionFollowUpStep}
        component={DailySessionFollowUpStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Mission Detail',
            ...progressHeader,
          }),
        }}
        name={DailySessionRoutes.DailySessionMissionStep}
        component={DailySessionMissionStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Daily Session',
            ...progressHeader,
          }),
        }}
        name={DailySessionRoutes.DailySessionReflectStep}
        component={DailySessionReflectStepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
          ...appHeaderOptions({
            title: 'Daily Session',
            ...progressHeader,
          }),
        }}
        name={DailySessionRoutes.DailySessionCompleteStep}
        component={DailySessionCompleteStepScreen}
      />
    </Stack.Navigator>
  );
}
