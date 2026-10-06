import {
  UpdateProfileInput,
  useUpdateProfileMutation,
} from '@/__generated__/graphql';
import { useCallback, useState, useTransition } from 'react';

import { MasterFormData } from '@/form/types';
import { useFormContext } from 'react-hook-form';

export const useUpdateProfileBootstrap = () => {
  const [bootstrapFinished, setBootstrapFinished] = useState<boolean>(false);
  const [isBootstrapPending, startTransition] = useTransition();
  const [isBootstrapError, setBootstrapError] = useState<boolean>(false);
  const [triggerUpdateProfileMutation] = useUpdateProfileMutation();

  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const bootstrapProfileUpdate = useCallback(
    async (input: UpdateProfileInput) => {
      await triggerUpdateProfileMutation({ input });
    },
    [triggerUpdateProfileMutation],
  );

  const handleStartProfileUpdate = useCallback(async () => {
    startTransition(async () => {
      // 2. Instantly update the UI to true

      try {
        const displayName = getValues('updateProfile.displayName');
        const bio = getValues('updateProfile.bio');
        const phone = getValues('updateProfile.phone');
        const gender = getValues('updateProfile.gender');
        const dob = getValues('updateProfile.dob');
        const updateProfilePaylod: UpdateProfileInput = {
          displayName,
          bio,
          phone,
          gender,
          dob,
        };
        console.log('updateProfilePaylod', updateProfilePaylod);
        // 3. Perform the actual background work
        await bootstrapProfileUpdate(updateProfilePaylod);

        // 4. Update the final source of truth when successful
        setBootstrapFinished(true);
      } catch (error) {
        console.error('Update Profile Bootstrap failed', error);
        setBootstrapError(true);
        // If an error happens, React automatically rolls
        // optimisticBootstrapFinished back to false
      }
    });
  }, [bootstrapProfileUpdate, getValues]);

  return {
    bootstrapFinished,
    isBootstrapPending,
    handleStartProfileUpdate,
    control,
    errors,
    getValues,
    setError,
    clearErrors,
    isBootstrapError,
  };
};
