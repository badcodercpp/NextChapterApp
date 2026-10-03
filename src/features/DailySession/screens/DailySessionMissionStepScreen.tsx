import {
  AppAuthenticatedLayout,
  AppButton,
  AppConfirmModal,
} from '@/components';
import {
  MissionOverviewCard,
  MissionProgressCard,
  MissionStepsCard,
  SessionProgress,
} from '../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { ChevronRight } from 'lucide-react-native';
import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { TodaysMissionCard } from '@/features/CommonFeature';
import { View } from 'react-native';

export function DailySessionMissionStepScreen() {
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <SessionProgress currentStep={'MISSION'} />
      </View>
      <View className="mt-4">
        <TodaysMissionCard showProgress={false} />
      </View>
      <View className="mt-4">
        <MissionProgressCard />
      </View>
      <View className="mt-4">
        <MissionOverviewCard />
      </View>
      <View className="mt-4">
        <MissionStepsCard />
      </View>
      <View className="mt-4">
        <AppButton
          title="Start Mission"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={() => setShowProceedModal(true)}
          rightIcon={ChevronRight}
        />
      </View>

      <AppConfirmModal
        visible={showProceedModal}
        title="Stay True to Yourself"
        message="Hard times can make you question who you are. Keep holding on to your values, your identity, and the person you want to become. Even when life feels heavy, don't lose yourself trying to survive it."
        confirmText="Continue"
        cancelText="Stay here"
        onCancel={() => {
          setShowProceedModal(false);
        }}
        onConfirm={() => {
          setShowProceedModal(false);
          navigation.navigate('DailySessionReflectStep');
        }}
      />
    </AppAuthenticatedLayout>
  );
}
