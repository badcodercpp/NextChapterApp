import { Image, View } from 'react-native';
import { PickedAvatar, cn, pickAvatar } from '@/utils';
import React, { useEffect, useState } from 'react';
import {
  useUpdateProfileMutation,
  useUploadSingleFilesMutation,
} from '@/__generated__/graphql';

import type { AppAvatarProps } from './types';
import { AppFileChooseModal } from '../AppFileChooseModal';
import { AppImagePreviewModal } from '@/components';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { AvatarSizes } from './variants';

export function AppAvatar({
  name,
  uri,
  source,
  size = 'md',
  className,
  onPress,
  enablePhotoActions = false,
  ...props
}: AppAvatarProps) {
  const [showFileChooseModal, setShowFileChooseModal] = useState(false);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);

  const [openPicker, setOpenPicker] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState<PickedAvatar | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [uploadSingleFiles] = useUploadSingleFilesMutation();
  const [triggerUpdateProfileMutation] = useUpdateProfileMutation();

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
   * Open the existing remote image.
   */
  const handleViewPhoto = () => {
    setShowFileChooseModal(false);

    if (!uri) {
      return;
    }

    setShowImagePreviewModal(true);
  };

  /**
   * Change profile photo.
   */
  const handleChangePhoto = () => {
    setShowFileChooseModal(false);
    setOpenPicker(true);
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
      setShowFileChooseModal(true);
      return;
    }

    // Photo exists but actions are disabled.
    // Simply preview the image.
    if (uri) {
      setShowImagePreviewModal(true);
    }
  };

  /**
   * Close remote image preview.
   */
  const handleCloseImagePreview = () => {
    setShowImagePreviewModal(false);
  };

  /**
   * Cancel newly selected avatar.
   */
  const handleCancelAvatar = () => {
    if (loading) {
      return;
    }

    setSelectedAvatar(null);
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

      setSelectedAvatar(null);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open native photo picker after
   * AppFileChooseModal has been closed.
   */
  useEffect(() => {
    if (!openPicker) {
      return;
    }

    const timer = setTimeout(async () => {
      setOpenPicker(false);

      try {
        const file = await pickAvatar();

        if (!file) {
          return;
        }

        setSelectedAvatar(file);
      } catch (error) {
        console.error('Failed to pick avatar:', error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [openPicker]);

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
        <AppText variant="lg" color="text">
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

      {/* 
        Action modal:
        View Photo / Change Photo
      */}
      {enablePhotoActions && (
        <AppFileChooseModal
          visible={showFileChooseModal}
          onCancel={() => setShowFileChooseModal(false)}
          onView={handleViewPhoto}
          onChange={handleChangePhoto}
          showView={!!uri}
        />
      )}

      {/*
        Existing remote image preview.
      */}
      {uri && (
        <AppImagePreviewModal
          visible={showImagePreviewModal}
          uri={uri}
          title="Profile Photo"
          message=""
          confirmText="Ok"
          onCancel={handleCloseImagePreview}
          onConfirm={handleCloseImagePreview}
        />
      )}

      {/*
        Newly selected image preview before upload.
      */}
      {selectedAvatar && (
        <AppImagePreviewModal
          visible={!!selectedAvatar}
          uri={selectedAvatar.uri}
          title="Profile Photo"
          message="Use this photo as your profile picture?"
          cancelText="Cancel"
          confirmText="Use Photo"
          onCancel={handleCancelAvatar}
          onConfirm={handleConfirmAvatar}
          loading={loading}
        />
      )}
    </>
  );
}
