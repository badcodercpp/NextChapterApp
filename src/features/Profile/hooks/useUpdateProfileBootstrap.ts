import {
  UpdateProfileInput,
  useLazyMeQuery,
  useUpdateProfileMutation,
} from '@/__generated__/graphql';
import { useCallback, useState, useTransition } from 'react';

import { MasterFormData } from '@/form/types';
import { RTKQueryFixedCacheKey } from '@/api/fixedCacheKey';
import { selectMe } from '@/state/selectors';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

export const useUpdateProfileBootstrap = () => {
  const [bootstrapFinished, setBootstrapFinished] = useState(false);
  const [isBootstrapError, setBootstrapError] = useState(false);

  const [isBootstrapPending, startTransition] = useTransition();

  const [triggerUpdateProfileMutation] = useUpdateProfileMutation({
    fixedCacheKey: RTKQueryFixedCacheKey.UPDATE_PROFILE,
  });

  const { data: me } = useSelector(selectMe);

  const [triggerMeQuery] = useLazyMeQuery();

  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const bootstrapProfileUpdate = useCallback(
    async (input: UpdateProfileInput) => {
      await triggerUpdateProfileMutation({ input }).unwrap();

      await triggerMeQuery().unwrap();
    },
    [triggerMeQuery, triggerUpdateProfileMutation],
  );

  const handleStartProfileUpdate = useCallback(async (): Promise<boolean> => {
    setBootstrapError(false);
    setBootstrapFinished(false);

    return new Promise(resolve => {
      startTransition(async () => {
        try {
          const displayName = getValues('updateProfile.displayName');
          const bio = getValues('updateProfile.bio');
          const phone = getValues('updateProfile.phone');
          const gender = getValues('updateProfile.gender');
          const dob = getValues('updateProfile.dob');

          const updateProfilePayload: UpdateProfileInput = {};

          if (displayName && me?.displayName !== displayName) {
            updateProfilePayload.displayName = displayName;
          }

          if (bio && me?.bio !== bio) {
            updateProfilePayload.bio = bio;
          }

          if (phone && me?.phone !== phone) {
            updateProfilePayload.phone = phone;
          }

          if (gender && me?.gender !== gender) {
            updateProfilePayload.gender = gender;
          }

          if (dob && me?.dob !== dob) {
            updateProfilePayload.dob = dob;
          }

          console.log('updateProfilePayload', updateProfilePayload);

          await bootstrapProfileUpdate(updateProfilePayload);

          setBootstrapFinished(true);
          setBootstrapError(false);

          resolve(true);
        } catch (error) {
          console.error('Update Profile Bootstrap failed', error);

          setBootstrapFinished(false);
          setBootstrapError(true);

          resolve(false);
        }
      });
    });
  }, [
    bootstrapProfileUpdate,
    getValues,
    me?.bio,
    me?.displayName,
    me?.dob,
    me?.gender,
    me?.phone,
  ]);

  return {
    bootstrapFinished,
    isBootstrapPending,
    isBootstrapError,

    handleStartProfileUpdate,

    control,
    errors,
    getValues,
    setError,
    clearErrors,
  };
};
