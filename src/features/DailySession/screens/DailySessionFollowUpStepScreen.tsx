import {
  AppAuthenticatedLayout,
  AppButton,
  AppConfirmModal,
  AppInput,
  AppText,
} from '@/components';
import { ChevronRight, Send } from 'lucide-react-native';
import {
  FollowUpChats,
  FollowUpProgressCard,
  QuickFollowupReplyCard,
  SessionProgress,
} from '../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { View } from 'react-native';

export function DailySessionFollowUpStepScreen() {
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

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
      <View className="mt-4">
        <AppButton
          title="Next"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={() => {
            setShowProceedModal(true);
          }}
          rightIcon={ChevronRight}
        />
      </View>
      <AppConfirmModal
        visible={showProceedModal}
        title="Are you sure you want to proceed ?"
        message="We suggest you to answer atleast 5 followup questions, it will help you to let go of pain."
        confirmText="Proceed"
        cancelText="Stay"
        onCancel={() => {
          setShowProceedModal(false);
        }}
        onConfirm={() => {
          setShowProceedModal(false);
          navigation.navigate('DailySessionMissionStep');
        }}
      />
    </AppAuthenticatedLayout>
  );
}
