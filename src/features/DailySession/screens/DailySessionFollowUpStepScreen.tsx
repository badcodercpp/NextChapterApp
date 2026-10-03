import { AppAuthenticatedLayout, AppInput, AppText } from '@/components';
import {
  FollowUpChats,
  FollowUpProgressCard,
  QuickFollowupReplyCard,
  SessionProgress,
} from '../components';

import React from 'react';
import { Send } from 'lucide-react-native';
import { View } from 'react-native';

export function DailySessionFollowUpStepScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <SessionProgress currentStep={'FOLLOW_UPS'} />
      </View>
      <View className="mt-4">
        <FollowUpChats />
      </View>
      <View className="mt-4">
        <QuickFollowupReplyCard />
      </View>
      <View className="mt-4">
        <AppInput
          value={''}
          onChangeText={() => {}}
          placeholder="Type your answer..."
          multiline
          showCharacterCount
          className="w-full"
          endIcon={Send}
          endIconClassName="text-primary"
          endIconSize={24}
          onEndIconPress={() => {}}
          inputClassName=" px-2 pt-4 text-md text-text border-border"
          containerClassName="border-border"
        />
        <AppText variant="sm" className="mt-1 text-center text-text-muted">
          Only you and your AI coach can see this.
        </AppText>
      </View>
      <View className="mt-4">
        <FollowUpProgressCard current={1} total={5} />
      </View>
    </AppAuthenticatedLayout>
  );
}
