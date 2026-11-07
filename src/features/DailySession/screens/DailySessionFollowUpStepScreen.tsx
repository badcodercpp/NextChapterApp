import {
  AppAuthenticatedLayout,
  AppButton,
  AppConfirmModal,
  AppInput,
  AppIcon,
  AppText,
} from '@/components';
import { ChevronRight, LockKeyhole, Send } from 'lucide-react-native';
import {
  FollowUpChats,
  FollowUpProgressCard,
  QuickFollowupReplyCard,
  SessionProgress,
} from '../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { DailySessionStackParamList } from '../navigation';
import { DailySessionStep } from '@/__generated__/graphql';
import { View } from 'react-native';
import { useOptimisticSessionStepUpdate } from '../hooks/useOptimisticSessionStepUpdate';

export function DailySessionFollowUpStepScreen() {
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-5">
        <SessionProgress currentStep={'FOLLOW_UPS'} />
      </View>
      <View className="mt-5">
        <FollowUpChats />
      </View>
      <View className="mt-4">
        <QuickFollowupReplyCard />
      </View>
      <View className="mt-4">
        <AppInput
          variant="v2"
          value={''}
          onChangeText={() => {}}
          placeholder="Type your answer..."
          multiline
          showCharacterCount
          className="w-full"
          endIcon={Send}
          endIconClassName="text-link-v2"
          endIconSize={24}
          onEndIconPress={() => {}}
          inputClassName="min-h-[104px] px-3 pt-4 text-md text-text-v2"
          containerClassName="rounded-[24px] border-primary-v2/40 bg-selected-v2/40"
        />
        <View className="mt-3 flex-row items-center justify-center px-3">
          <AppIcon
            icon={LockKeyhole}
            size={16}
            className="mr-2 text-text-muted-v2"
          />
          <AppText
            variant="xs"
            className="shrink text-center text-text-muted-v2"
          >
            Only you and your AI coach can see this.
          </AppText>
        </View>
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
          updateDailySessionStep(DailySessionStep.Mission);
          navigation.navigate('DailySessionMissionStep');
        }}
      />
    </AppAuthenticatedLayout>
  );
}
