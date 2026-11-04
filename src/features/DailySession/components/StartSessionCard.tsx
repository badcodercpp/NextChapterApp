import { AppButton, AppConfirmModal } from '@/components';
import { ChevronRight, Play } from 'lucide-react-native';
import {
  DailySessionStep,
  RecoveryReasonCurrentFeeling,
} from '@/__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { useOptimisticSessionStepUpdate } from '../hooks/useOptimisticSessionStepUpdate';

interface StartSessionCardProps {
  onRemindLater?: () => void;
  currentMood: Array<RecoveryReasonCurrentFeeling | undefined>;
}

export function StartSessionCard({ currentMood }: StartSessionCardProps) {
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();

  const continueSession = useCallback(() => {
    if (!currentMood || currentMood.length === 0) {
      setShowProceedModal(true);
    } else {
      updateDailySessionStep(DailySessionStep.Question);
      navigation.navigate('DailySessionQuestionStep');
    }
  }, [currentMood, navigation, updateDailySessionStep]);

  return (
    <>
      <AppButton
        title="Continue Daily Session"
        size="lg"
        leftIcon={Play}
        fullWidth
        className="mb-0"
        onPress={continueSession}
        rightIcon={ChevronRight}
      />
      <AppConfirmModal
        visible={showProceedModal}
        title="Are you sure you want to proceed ?"
        message="We suggest you to select your feeling to get better insights. You can also skip this step and proceed to the next step."
        confirmText="Proceed"
        cancelText="Stay"
        onCancel={() => {
          setShowProceedModal(false);
        }}
        onConfirm={() => {
          setShowProceedModal(false);
          updateDailySessionStep(DailySessionStep.Question);
          navigation.navigate('DailySessionQuestionStep');
        }}
      />
    </>
  );
}
