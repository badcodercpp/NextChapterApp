import {
  DailySessionStep,
  useCompleteDailySessionMutation,
  useLazyActiveDailySessionQuery,
  useLazyCurrentSessionReflectionQuery,
  useLazyMyAccessQuery,
  useUpdateReflectionMutation,
} from '@/__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { MasterFormData } from '@/form/types';
import { showToast } from '@/components';
import { useFormContext } from 'react-hook-form';
import { useOptimisticSessionStepUpdate } from '../hooks/useOptimisticSessionStepUpdate';

export const useDailySessionReflectStep = () => {
  const [
    isPendingCurrentSessionReflectionQuery,
    setIsPendingCurrentSessionReflectionQuery,
  ] = useState<boolean>(false);

  const [
    isPendingUpdateSessionReflectionQuery,
    setIsPendingUpdateSessionReflectionQuery,
  ] = useState<boolean>(false);

  const { getValues } = useFormContext<MasterFormData>();

  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();

  const [triggerLazyCurrentSessionReflectionQuery] =
    useLazyCurrentSessionReflectionQuery();

  const [triggerUpdateReflectionMutation] = useUpdateReflectionMutation();
  const [triggerCompleteDailySessionMutation] =
    useCompleteDailySessionMutation();
  const [triggerLazyActiveDailySessionQuery] = useLazyActiveDailySessionQuery();
  const [refreshAccess] = useLazyMyAccessQuery();

  const getCurrntSessionReflection = useCallback(async () => {
    try {
      setIsPendingCurrentSessionReflectionQuery(true);
      await triggerLazyCurrentSessionReflectionQuery();
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsPendingCurrentSessionReflectionQuery(false);
    }
  }, [triggerLazyCurrentSessionReflectionQuery]);

  const goToNextStep = useCallback(async () => {
    try {
      setIsPendingUpdateSessionReflectionQuery(true);
      const realization = getValues('sessionReflection.realization');
      const feeling = getValues('sessionReflection.feeling');
      const need = getValues('sessionReflection.need');
      const action = getValues('sessionReflection.action');
      const userMessage = getValues('sessionReflection.userMessage');
      await triggerUpdateReflectionMutation({
        input: {
          realization,
          feeling,
          need,
          action,
          userMessage,
        },
      });
      await triggerLazyCurrentSessionReflectionQuery();
      await triggerCompleteDailySessionMutation().unwrap();
      refreshAccess()
        .unwrap()
        .catch(error => console.error('Unable to refresh access:', error));
      await triggerLazyActiveDailySessionQuery();
      updateDailySessionStep(DailySessionStep.Completed);
      navigation.navigate('DailySessionCompleteStep');
    } catch (error) {
      console.log('error', error);
      showToast('Something went wrong, Please try again later', 'error');
    } finally {
      setIsPendingUpdateSessionReflectionQuery(false);
    }
  }, [
    getValues,
    navigation,
    refreshAccess,
    triggerCompleteDailySessionMutation,
    triggerLazyActiveDailySessionQuery,
    triggerLazyCurrentSessionReflectionQuery,
    triggerUpdateReflectionMutation,
    updateDailySessionStep,
  ]);

  useEffect(() => {
    getCurrntSessionReflection();
  }, [getCurrntSessionReflection]);

  return {
    isPendingCurrentSessionReflectionQuery,
    isPendingUpdateSessionReflectionQuery,
    goToNextStep,
  };
};
