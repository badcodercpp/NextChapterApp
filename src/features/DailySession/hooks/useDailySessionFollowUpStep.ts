import {
  ConversationRole,
  DailySessionStep,
  useFollowUpMutation,
  useLazyTodayQuestionQuery,
} from '@/__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getLastConversationByRole, mapZodErrorsToForm } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { MasterFormData } from '@/form/types';
import { selectTodayQuestion } from '@/state/selectors';
import { showToast } from '@/components';
import { todaysQuestionFollowupSchema } from '@/form/schema';
import { useOptimisticSessionStepUpdate } from './useOptimisticSessionStepUpdate';
import { useSelector } from 'react-redux';

export const useDailySessionFollowUpStep = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { data: todayQuestion } = useSelector(selectTodayQuestion);

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();

  const [triggerFollowUpMutation] = useFollowUpMutation();
  const [triggerLazyTodayQuestionQuery] = useLazyTodayQuestionQuery();

  const lastAssistantConversation = useMemo(() => {
    return getLastConversationByRole(todayQuestion, ConversationRole.Assistant);
  }, [todayQuestion]);

  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useFormContext<MasterFormData>();
  const answerText = useWatch({
    control,
    name: 'todaysQuestionFollowup.answer',
  });
  const hasValidAnswer =
    answerText?.trim().length > 2 &&
    !errors?.todaysQuestionFollowup?.answer?.message;

  const createFollowupRecord = useCallback(async () => {
    try {
      const result = todaysQuestionFollowupSchema.safeParse({
        answer: answerText,
      });

      if (!result.success || !hasValidAnswer) {
        mapZodErrorsToForm({
          error: result.error as any,
          setError,
          clearErrors,
          parentKey: 'todaysQuestionFollowup',
        });
        showToast("Please provide folowup for today's question", 'error');

        return;
      }
    } catch (error) {
      console.log("folowup for today's question is not valid", error);
      showToast("Please provide folowup for today's question", 'error');
    }
    try {
      setIsPending(true);
      if (todayQuestion?.id) {
        await triggerFollowUpMutation({
          input: {
            questionHistoryId: todayQuestion?.id,
            answer: answerText,
          },
        }).unwrap();
        triggerLazyTodayQuestionQuery().unwrap();
        reset({
          todaysQuestionFollowup: {
            answer: '',
          },
        });
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
      console.log('error', error);
    } finally {
      setIsPending(false);
    }
  }, [
    answerText,
    clearErrors,
    hasValidAnswer,
    reset,
    setError,
    todayQuestion?.id,
    triggerFollowUpMutation,
    triggerLazyTodayQuestionQuery,
  ]);

  const createQuickReplyFollowupRecord = useCallback(
    async (answerData: string) => {
      try {
        setIsPending(true);
        if (todayQuestion?.id) {
          await triggerFollowUpMutation({
            input: {
              questionHistoryId: todayQuestion?.id,
              answer: answerData,
            },
          }).unwrap();
          triggerLazyTodayQuestionQuery().unwrap();
        }
      } catch (error) {
        console.log('error', error);
        showToast('Something went wrong', 'error');
      } finally {
        setIsPending(false);
      }
    },
    [todayQuestion?.id, triggerFollowUpMutation, triggerLazyTodayQuestionQuery],
  );

  const goToNextStep = useCallback(() => {
    if (lastAssistantConversation && lastAssistantConversation.summary) {
      updateDailySessionStep(DailySessionStep.Mission);
      navigation.navigate('DailySessionMissionStep');
    } else {
      showToast("Please provide all followup for today's question", 'error');
    }
  }, [lastAssistantConversation, navigation, updateDailySessionStep]);

  const openProceedModal = useCallback(() => {
    if (lastAssistantConversation && lastAssistantConversation.summary) {
      goToNextStep();
    } else {
      setShowProceedModal(true);
    }
  }, [setShowProceedModal, lastAssistantConversation, goToNextStep]);

  const closeProceedModal = useCallback(() => {
    setShowProceedModal(false);
  }, [setShowProceedModal]);

  const openSummaryModal = useCallback(() => {
    setShowSummaryModal(true);
  }, [setShowSummaryModal]);

  const closeSummaryModal = useCallback(() => {
    setShowSummaryModal(false);
  }, [setShowSummaryModal]);

  useEffect(() => {
    if (lastAssistantConversation && lastAssistantConversation.summary) {
      setShowSummaryModal(true);
    }
  }, [lastAssistantConversation]);

  return {
    isPending,
    goToNextStep,
    showProceedModal,
    openProceedModal,
    closeProceedModal,
    showSummaryModal,
    openSummaryModal,
    closeSummaryModal,
    createFollowupRecord,
    createQuickReplyFollowupRecord,
    lastAssistantConversation,
  };
};
