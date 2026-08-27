// src/types/navigation.d.ts

import '@react-navigation/native-stack';

declare module '@react-navigation/native-stack' {
  interface NativeStackNavigationOptions {
    backDisabled?: boolean;
  }
}
