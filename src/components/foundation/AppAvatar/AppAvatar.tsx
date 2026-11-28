import {
  AppImagePreviewContent,
  AppPhotoModalShell,
} from '../AppImagePreviewModal/AppImagePreviewModal';
import { Image, View } from 'react-native';
import { PickedAvatar, cn, pickAvatar } from '@/utils';
import React, { useImperativeHandle, useState } from 'react';
import {
  useLazyMeQuery,
  useUpdateProfileMutation,
  useUploadSingleFilesMutation,
} from '@/__generated__/graphql';

import type { AppAvatarProps } from './types';
import { AppFileChooseContent } from '../AppFileChooseModal';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { AvatarSizes } from './variants';
import { RTKQueryFixedCacheKey } from '@/api/fixedCacheKey';

type PhotoStep = 'actions' | 'view' | 'confirm';

export function AppAvatar({
  name,
  uri,
  source,
  size = 'md',
  className,
  onPress,
  enablePhotoActions = false,
  photoActionsRef,
  ...props
}: AppAvatarProps) {
  // One modal for every photo step, so switching steps never closes/re-opens it.
  const [photoStep, setPhotoStep] = useState<PhotoStep | null>(null);
  const [picking, setPicking] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState<PickedAvatar | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [uploadSingleFiles] = useUploadSingleFilesMutation();
  const [triggerUpdateProfileMutation] = useUpdateProfileMutation({
    fixedCacheKey: RTKQueryFixedCacheKey.UPDATE_PROFILE,
  });
  const [triggerMeQuery] = useLazyMeQuery();

  // Lets sibling UI (e.g. a "Change photo" label) open the photo actions modal.
  useImperativeHandle(
    photoActionsRef,
    () => ({ open: () => setPhotoStep('actions') }),
    [],
  );

  const avatarSize = AvatarSizes[size];

  const initials =
    name
      ?.trim()
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '';

  /**
   * Show the existing remote image.
   */
  const handleViewPhoto = () => {
    if (uri) {
      setPhotoStep('view');
    }
  };

  /**
   * Change profile photo. The native picker presents over the open modal.
   */
  const handleChangePhoto = async () => {
    if (picking) {
      return;
    }

    setPicking(true);

    try {
      const file = await pickAvatar();

      if (file) {
        setSelectedAvatar(file);
        setPhotoStep('confirm');
      }
    } catch (error) {
      console.error('Failed to pick avatar:', error);
    } finally {
      setPicking(false);
    }
  };

  /**
   * Avatar press.
   */
  const handlePress = () => {
    // Preserve custom press behavior.
    if (onPress) {
      onPress();
      return;
    }

    // No image + no photo actions = nothing to do.
    if (!uri && !source && !enablePhotoActions) {
      return;
    }

    // Photo actions enabled.
    if (enablePhotoActions) {
      setPhotoStep('actions');
      return;
    }

    // Photo exists but actions are disabled.
    // Simply preview the image.
    if (uri) {
      setPhotoStep('view');
    }
  };

  /**
   * Close the photo modal entirely.
   */
  const handleClosePhotoModal = () => {
    if (loading) {
      return;
    }

    setPhotoStep(null);
    setSelectedAvatar(null);
  };

  /**
   * OK / Cancel return to the View / Change photo actions.
   */
  const handleBackToPhotoActions = () => {
    if (loading) {
      return;
    }

    setSelectedAvatar(null);

    if (enablePhotoActions) {
      setPhotoStep('actions');
    } else {
      setPhotoStep(null);
    }
  };

  /**
   * Upload newly selected avatar.
   */
  const handleConfirmAvatar = async () => {
    if (!selectedAvatar || loading) {
      return;
    }

    setLoading(true);

    try {
      const uploadResult = await uploadSingleFiles({
        file: {
          uri: selectedAvatar.uri,
          name: selectedAvatar.name,
          type: selectedAvatar.type,
        },
      }).unwrap();

      await triggerUpdateProfileMutation({
        input: {
          avatarUrl: uploadResult.uploadSingleFiles.url,
        },
      }).unwrap();

      await triggerMeQuery().unwrap();

      setSelectedAvatar(null);
      setPhotoStep(null);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  const avatar = (
    <View
      className={cn(
        'items-center justify-center overflow-hidden rounded-full bg-primary',
        avatarSize.container,
        className,
      )}
    >
      {uri || source ? (
        <Image
          source={uri ? { uri } : source}
          className="h-full w-full"
          resizeMode="cover"
        />
      ) : (
        <AppText variant="md" color="text">
          {initials}
        </AppText>
      )}
    </View>
  );

  /*
   * Nothing interactive.
   */
  if (!onPress && !enablePhotoActions && !uri) {
    return avatar;
  }

  return (
    <>
      <AppPressable onPress={handlePress} {...props}>
        {avatar}
      </AppPressable>

      <AppPhotoModalShell
        visible={photoStep !== null}
        onClose={handleClosePhotoModal}
        closeDisabled={loading}
      >
        {photoStep === 'actions' && (
          <AppFileChooseContent
            onCancel={handleClosePhotoModal}
            onView={handleViewPhoto}
            onChange={handleChangePhoto}
            showView={!!uri}
          />
        )}

        {photoStep === 'view' && uri && (
          <AppImagePreviewContent
            uri={uri}
            title="Profile Photo"
            message="View your profile picture"
            confirmText="OK"
            onCancel={handleClosePhotoModal}
            onConfirm={handleBackToPhotoActions}
          />
        )}

        {photoStep === 'confirm' && selectedAvatar && (
          <AppImagePreviewContent
            uri={selectedAvatar.uri}
            title="Profile Photo"
            message="Use this photo as your profile picture?"
            cancelText="Cancel"
            confirmText="Use Photo"
            onCancel={handleBackToPhotoActions}
            onConfirm={handleConfirmAvatar}
            loading={loading}
          />
        )}
      </AppPhotoModalShell>
    </>
  );
}
