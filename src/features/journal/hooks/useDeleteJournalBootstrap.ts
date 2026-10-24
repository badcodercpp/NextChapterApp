import { useCallback, useState } from 'react';
import {
  useDeleteJournalEntryMutation,
  useLazyMyJournalEntriesQuery,
  useLazyRecentJournalEntriesQuery,
} from '@/__generated__/graphql';

export const useDeleteJournalBootstrap = () => {
  const [deletingJournal, setDeletingJournal] = useState<boolean>(false);

  const [triggerDeleteJournalEntryMutation] = useDeleteJournalEntryMutation();

  const [triggerRecentJournalEntriesQuery] = useLazyRecentJournalEntriesQuery();

  const [triggerLazyMyJournalEntriesQuery] = useLazyMyJournalEntriesQuery();

  const deleteJournal = useCallback(
    async (id: string) => {
      try {
        setDeletingJournal(true);
        await triggerDeleteJournalEntryMutation({ id }).unwrap();
        triggerRecentJournalEntriesQuery();
        triggerLazyMyJournalEntriesQuery();
      } catch (error) {
        console.log(error);
      } finally {
        setDeletingJournal(false);
      }
    },
    [
      triggerDeleteJournalEntryMutation,
      triggerLazyMyJournalEntriesQuery,
      triggerRecentJournalEntriesQuery,
    ],
  );

  return {
    deleteJournal,
    deletingJournal,
  };
};
