import { DailySessionStep, useFollowUpMutation } from '@/__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DailySessionStackParamList } from '../navigation';
import { MasterFormData } from '@/form/types';
import { mapZodErrorsToForm } from '@/utils';
import { selectTodayQuestion } from '@/state/selectors';
import { showToast } from '@/components';
import { todaysQuestionAnswerSchema } from '@/form';
import { useOptimisticSessionStepUpdate } from './useOptimisticSessionStepUpdate';
import { useSelector } from 'react-redux';

export const useDailySessionQuestionStep = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { data: todayQuestion } = useSelector(selectTodayQuestion);

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();
  const [triggerFollowUpMutation] = useFollowUpMutation();

  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useFormContext<MasterFormData>();
  const answerText = useWatch({ control, name: 'todaysQuestionAnswer.answer' });
  const hasValidAnswer =
    answerText?.trim().length > 2 &&
    !errors?.todaysQuestionAnswer?.answer?.message;

  const openProceedModal = useCallback(() => {
    setShowProceedModal(true);
  }, [setShowProceedModal]);

  const closeProceedModal = useCallback(() => {
    setShowProceedModal(false);
  }, [setShowProceedModal]);

  const goToNextStep = useCallback(async () => {
    try {
      const result = todaysQuestionAnswerSchema.safeParse({
        answer: answerText,
      });

      if (!result.success || !hasValidAnswer) {
        mapZodErrorsToForm({
          error: result.error as any,
          setError,
          clearErrors,
          parentKey: 'todaysQuestionAnswer',
        });
        showToast("Please provide answer for today's question", 'error');

        return;
      }
    } catch (error) {
      console.log("answer for today's question is not valid", error);
      showToast("Please provide answer for today's question", 'error');
    }
    try {
      setIsPending(true);

      if (todayQuestion?.id) {
        try {
          await triggerFollowUpMutation({
            input: {
              questionHistoryId: todayQuestion?.id,
              answer: answerText,
            },
          }).unwrap();
          reset({
            todaysQuestionAnswer: {
              answer: '',
            },
          });
        } catch (error) {
          console.log('error', error);
          showToast('Something went wrong, Please try again later', 'error');
        }
      } else {
        showToast('Something went wrong, Please try again later', 'error');
      }
      updateDailySessionStep(DailySessionStep.FollowUp);
    } catch (error) {
      console.log('error', error);
      showToast('Something went wrong, Please try again later', 'error');
    } finally {
      setIsPending(false);
    }

    navigation.navigate('DailySessionFollowUpStep');
  }, [
    answerText,
    clearErrors,
    hasValidAnswer,
    navigation,
    reset,
    setError,
    todayQuestion?.id,
    triggerFollowUpMutation,
    updateDailySessionStep,
  ]);

  return {
    showProceedModal,
    goToNextStep,
    openProceedModal,
    closeProceedModal,
    isPending,
  };
};
