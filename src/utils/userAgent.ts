import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export function getUserAgent() {
  const appName = DeviceInfo.getApplicationName(); // e.g., "MyApp"
  const appVersion = DeviceInfo.getVersion(); // e.g., "1.0.0"
  const osVersion = DeviceInfo.getSystemVersion(); // e.g., "17.4"

  // Custom structured User-Agent for your backend to parse cleanly
  return `${appName}/${appVersion} (${
    Platform.OS === 'ios' ? 'iOS' : 'Android'
  } ${osVersion})`;
}
