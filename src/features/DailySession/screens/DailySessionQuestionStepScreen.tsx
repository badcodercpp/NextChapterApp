import {
  AnswerStarterCard,
  HealingMessageCard,
  PrivateAnswerCard,
  SessionProgress,
  TodaysQuestionCardInSession,
} from '../components';
import { AppAuthenticatedLayout, AppButton } from '@/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ChevronRight } from 'lucide-react-native';
import { DailySessionStackParamList } from '../navigation';
import { DailySessionStep } from '@/__generated__/graphql';
import React from 'react';
import { TodaysQuestionAnswerInputCard } from '@/features/CommonFeature';
import { View } from 'react-native';
import { useOptimisticSessionStepUpdate } from '../hooks/useOptimisticSessionStepUpdate';

export function DailySessionQuestionStepScreen() {
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();
  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <SessionProgress currentStep={'QUESTION'} />
      </View>
      <View className="mt-4">
        <TodaysQuestionCardInSession />
      </View>
      <View className="mt-4">
        <PrivateAnswerCard />
      </View>
      <View className="mt-4">
        <TodaysQuestionAnswerInputCard />
      </View>
      <View className="mt-4">
        <AnswerStarterCard />
      </View>
      <View className="mt-4">
        <AppButton
          title="Next"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={() => {
            updateDailySessionStep(DailySessionStep.FollowUp);
            navigation.navigate('DailySessionFollowUpStep');
          }}
          rightIcon={ChevronRight}
        />
      </View>
      <View className="mt-4">
        <HealingMessageCard />
      </View>
    </AppAuthenticatedLayout>
  );
}
