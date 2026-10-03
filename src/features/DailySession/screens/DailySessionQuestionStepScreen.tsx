import {
  AnswerInputCard,
  AnswerStarterCard,
  HealingMessageCard,
  PrivateAnswerCard,
  SessionProgress,
  TodaysQuestionCardInSession,
} from '../components';
import { AppAuthenticatedLayout, AppButton } from '@/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ChevronRight } from 'lucide-react-native';
import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import React from 'react';
import { View } from 'react-native';

export function DailySessionQuestionStepScreen() {
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();
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
        <AnswerInputCard value={''} onChangeText={() => {}} />
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
          onPress={() => navigation.navigate('DailySessionFollowUpStep')}
          rightIcon={ChevronRight}
        />
      </View>
      <View className="mt-4">
        <HealingMessageCard />
      </View>
    </AppAuthenticatedLayout>
  );
}
