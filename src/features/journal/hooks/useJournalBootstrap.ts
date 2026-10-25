import {
  RecoveryReasonCurrentFeeling,
  useCreateJournalEntryMutation,
  useLazyMyJournalEntriesQuery,
  useLazyRecentJournalEntriesQuery,
} from '@/__generated__/graphql';
import { useCallback, useEffect, useState } from 'react';

import { MasterFormData } from '@/form/types';
import { createOrUpdateJournalSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { showToast } from '@/components';
import { useFormContext } from 'react-hook-form';
import { useIsFocused } from '@react-navigation/native';

export const useJournalBootstrap = () => {
  const { clearErrors, getValues, setError, reset } =
    useFormContext<MasterFormData>();

  const [value, setValue] = useState<
    Array<RecoveryReasonCurrentFeeling | undefined>
  >([]);
  const [creatingJournal, setCreatingJournal] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const [triggerRecentJournalEntriesQuery] = useLazyRecentJournalEntriesQuery();

  const [triggerLazyMyJournalEntriesQuery] = useLazyMyJournalEntriesQuery();

  const [triggerCreateJournalEntryMutation] = useCreateJournalEntryMutation();

  const createJournal = useCallback(async () => {
    if (!value || !value?.length) {
      showToast('Please select your mood', 'error');
      return;
    }
    const title = getValues('createOrUpdateJournal.title');
    const content = getValues('createOrUpdateJournal.content');

    const result = createOrUpdateJournalSchema.safeParse({
      title,
      content,
    });

    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'login',
      });
      showToast('Please provide required field value', 'error');
      return;
    }

    try {
      setCreatingJournal(true);
      const targetMood = value.map(
        e => e,
      ) as Array<RecoveryReasonCurrentFeeling>;
      await triggerCreateJournalEntryMutation({
        input: {
          title,
          content,
          mood: targetMood[targetMood.length - 1],
        },
      }).unwrap();

      reset({
        createOrUpdateJournal: {
          title: '',
          content: '',
        },
      });

      // refreshing history and recent journals
      triggerRecentJournalEntriesQuery();
      triggerLazyMyJournalEntriesQuery();

      setValue([]);
    } catch (e) {
      console.log('Login error:', e);
    } finally {
      setCreatingJournal(false);
    }
  }, [
    value,
    getValues,
    setError,
    clearErrors,
    triggerCreateJournalEntryMutation,
    triggerRecentJournalEntriesQuery,
    triggerLazyMyJournalEntriesQuery,
    reset,
  ]);

  useEffect(() => {
    triggerRecentJournalEntriesQuery();
  }, [triggerRecentJournalEntriesQuery]);

  useEffect(() => {
    if (!isFocused) {
      reset({
        createOrUpdateJournal: {
          title: '',
          content: '',
        },
      });
      setValue([]);
    }
  }, [isFocused, reset]);

  return {
    value,
    setValue,
    createJournal,
    creatingJournal,
  };
};
