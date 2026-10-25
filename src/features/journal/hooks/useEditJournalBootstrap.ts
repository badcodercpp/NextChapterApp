import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  RecoveryReasonCurrentFeeling,
  useLazyMyJournalEntriesQuery,
  useLazyRecentJournalEntriesQuery,
  useUpdateJournalEntryMutation,
} from '@/__generated__/graphql';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import { JournalStackParamList } from '@/features/journal/navigation';
import { MasterFormData } from '@/form/types';
import { createOrUpdateJournalSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { resetEditJournalTarget } from '@/state/slices/local/editJournalTarget';
import { selectEditJournalTargetData } from '@/state/selectors';
import { showToast } from '@/components';
import { useFormContext } from 'react-hook-form';

export const useEditJournalBootstrap = () => {
  const { clearErrors, getValues, setError, reset, setValues } =
    useFormContext<MasterFormData>();

  const navigation = useNavigation<NavigationProp<JournalStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const entry = useSelector(selectEditJournalTargetData);

  const [value, setValue] = useState<
    Array<RecoveryReasonCurrentFeeling | undefined>
  >([]);
  const [editingJournal, setEditingJournal] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const [triggerRecentJournalEntriesQuery] = useLazyRecentJournalEntriesQuery();

  const [triggerLazyMyJournalEntriesQuery] = useLazyMyJournalEntriesQuery();

  const [triggerUpdateJournalEntryMutation] = useUpdateJournalEntryMutation();

  const editJournal = useCallback(async () => {
    if (!entry) {
      return;
    }
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
      setEditingJournal(true);
      const targetMood = value.map(
        e => e,
      ) as Array<RecoveryReasonCurrentFeeling>;
      await triggerUpdateJournalEntryMutation({
        id: entry?.id ?? '',
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
      navigation.goBack();
    } catch (e) {
      console.log('Login error:', e);
    } finally {
      setEditingJournal(false);
    }
  }, [
    entry,
    value,
    getValues,
    setError,
    clearErrors,
    triggerUpdateJournalEntryMutation,
    reset,
    triggerRecentJournalEntriesQuery,
    triggerLazyMyJournalEntriesQuery,
    navigation,
  ]);

  useEffect(() => {
    if (!entry) {
      return;
    }
    if (entry.mood) {
      setValue([entry.mood]);
    }
    setValues({
      createOrUpdateJournal: {
        title: entry.title ?? '',
        content: entry?.content ?? '',
      },
    });
  }, [entry, setValues]);

  useEffect(() => {
    if (!isFocused) {
      dispatch(resetEditJournalTarget());
      reset({
        createOrUpdateJournal: {
          title: '',
          content: '',
        },
      });
      setValue([]);
    }
  }, [dispatch, isFocused, reset]);

  return {
    value,
    setValue,
    editJournal,
    editingJournal,
  };
};
