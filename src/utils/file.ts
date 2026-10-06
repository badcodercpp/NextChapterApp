import ImagePicker from 'react-native-image-crop-picker';

export interface PickedAvatar {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

export async function pickAvatar(): Promise<PickedAvatar | null> {
  try {
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,

      // Avatar crop
      width: 800,
      height: 800,
      cropperCircleOverlay: true,

      // Compression
      compressImageQuality: 0.9,

      // UI
      cropperToolbarTitle: 'Adjust Profile Photo',
      freeStyleCropEnabled: false,
    });

    return {
      uri: image.path,
      name: image.filename ?? 'avatar.jpg',
      type: image.mime ?? 'image/jpeg',
      size: image.size,
    };
  } catch (error) {
    // User cancelled
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'E_PICKER_CANCELLED'
    ) {
      return null;
    }

    throw error;
  }
}
