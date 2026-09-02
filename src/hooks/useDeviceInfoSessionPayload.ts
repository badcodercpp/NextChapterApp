import {
  DeviceInfoInput,
  DevicePlatform,
  DeviceType,
} from '@/__generated__/graphql';
import { getPublicIpAddress, getUserAgent } from '@/utils';

import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { useCallback } from 'react';

export const useDeviceInfoSessionPayload = () => {
  const getDeviceInfoSessionPayload =
    useCallback(async (): Promise<DeviceInfoInput> => {
      const platform: DevicePlatform =
        Platform.OS.toUpperCase() as DevicePlatform;
      const deviceType: DeviceType = (
        await DeviceInfo.getDeviceType()
      ).toUpperCase() as DeviceType;
      const deviceName = await DeviceInfo.getDeviceName();
      const deviceId = await DeviceInfo.getUniqueId();
      const appVersion = DeviceInfo.getVersion();
      const userAgent = await getUserAgent();
      const ipAddress = await getPublicIpAddress();

      return {
        platform,
        deviceType,
        deviceName,
        deviceId,
        appVersion,
        userAgent,
        ipAddress,
      };
    }, []);

  return { getDeviceInfoSessionPayload };
};
