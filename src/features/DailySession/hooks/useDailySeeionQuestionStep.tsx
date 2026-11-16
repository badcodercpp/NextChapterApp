import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DailySessionStackParamList } from '../navigation';
import { DailySessionStep } from '@/__generated__/graphql';
import { MasterFormData } from '@/form/types';
import { mapZodErrorsToForm } from '@/utils';
import { showToast } from '@/components';
import { todaysQuestionAnswerSchema } from '@/form';
import { useOptimisticSessionStepUpdate } from './useOptimisticSessionStepUpdate';

export const useDailySeeionQuestionStep = () => {
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();

  const {
    control,
    // formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();
  const answerText = useWatch({ control, name: 'todaysQuestionAnswer.answer' });
  //   const hasValidAnswer =
  //     answerText?.trim().length > 2 &&
  //     !errors?.todaysQuestionAnswer?.answer?.message;

  const openProceedModal = useCallback(() => {
    setShowProceedModal(true);
  }, [setShowProceedModal]);

  const closeProceedModal = useCallback(() => {
    setShowProceedModal(false);
  }, [setShowProceedModal]);

  const goToNextStep = useCallback(() => {
    try {
      const result = todaysQuestionAnswerSchema.safeParse({
        answer: answerText,
      });

      if (!result.success) {
        mapZodErrorsToForm({
          error: result.error,
          setError,
          clearErrors,
          parentKey: 'todaysQuestionAnswer',
        });

        return;
      }
    } catch (error) {
      console.log("answer for today's question is not valid", error);
      showToast("Please provide answer for today's question", 'error');
    }
    updateDailySessionStep(DailySessionStep.FollowUp);
    navigation.navigate('DailySessionFollowUpStep');
  }, [answerText, clearErrors, navigation, setError, updateDailySessionStep]);

  return {
    showProceedModal,
    goToNextStep,
    openProceedModal,
    closeProceedModal,
  };
};
