import { useCallback, useEffect, useState, useTransition } from 'react';

import { useLazyMoodThisWeekQuery } from '@/__generated__/graphql';

export const useProfileBootstrap = () => {
  const [bootstrapFinished, setBootstrapFinished] = useState<boolean>(false);
  const [isBootstrapPending, startTransition] = useTransition();

  const [triggerLazyMoodThisWeekQuery] = useLazyMoodThisWeekQuery();

  const bootstrapProfile = useCallback(() => {
    triggerLazyMoodThisWeekQuery();
  }, [triggerLazyMoodThisWeekQuery]);

  const handleStartSetup = useCallback(() => {
    startTransition(async () => {
      // 2. Instantly update the UI to true

      try {
        // 3. Perform the actual background work
        await bootstrapProfile();

        // 4. Update the final source of truth when successful
        setBootstrapFinished(true);
      } catch (error) {
        console.error('Bootstrap failed', error);
        // If an error happens, React automatically rolls
        // optimisticBootstrapFinished back to false
      }
    });
  }, [bootstrapProfile]);

  useEffect(() => {
    handleStartSetup();
  }, [handleStartSetup]);

  return {
    bootstrapFinished,
    isBootstrapPending,
  };
};
