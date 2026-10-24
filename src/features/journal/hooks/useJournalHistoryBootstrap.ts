import { useEffect } from 'react';
import { useLazyMyJournalEntriesQuery } from '@/__generated__/graphql';

export const useJournalHistoryBootstrap = () => {
  const [triggerLazyMyJournalEntriesQuery] = useLazyMyJournalEntriesQuery();

  useEffect(() => {
    triggerLazyMyJournalEntriesQuery();
  }, [triggerLazyMyJournalEntriesQuery]);
};
