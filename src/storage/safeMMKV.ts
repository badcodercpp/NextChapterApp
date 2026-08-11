import { Configuration, createMMKV } from 'react-native-mmkv';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a unified storage interface
export interface StorageInterface {
  set: (key: string, value: string) => void | Promise<void>;
  getString: (key: string) => string | null | Promise<string | null>;
  delete: (key: string) => void | Promise<any>;
}

// Function to safely initialize MMKV with AsyncStorage fallback
export const createMMKVStorage = (_config: Configuration): StorageInterface => {
  try {
    // Detect remote debugging (Chrome)
    const isRemoteDebugging =
      //@ts-ignore
      typeof atob === 'undefined' && typeof __remoteDev === 'boolean';

    if (isRemoteDebugging) {
      console.warn(
        'MMKV cannot run in remote debugger. Falling back to AsyncStorage.',
      );
      // Return AsyncStorage implementation
      return {
        set: async (key: string, value: string) => {
          await AsyncStorage.setItem(key, value);
        },
        getString: async (key: string) => {
          return await AsyncStorage.getItem(key);
        },
        delete: async (key: string) => {
          await AsyncStorage.removeItem(key);
        },
      };
    }

    // Safe to create real MMKV instance
    const mmkv = createMMKV();
    return {
      set: (key: string, value: string) => mmkv.set(key, value),
      getString: (key: string) => mmkv.getString(key) ?? null,
      delete: async (key: string) => {
        return mmkv.remove(key);
      },
    };
  } catch (error) {
    console.error(
      'Failed to initialize MMKV, falling back to AsyncStorage:',
      error,
    );
    return {
      set: async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value);
      },
      getString: async (key: string) => {
        return await AsyncStorage.getItem(key);
      },
      delete: async (key: string) => {
        await AsyncStorage.removeItem(key);
      },
    };
  }
};
