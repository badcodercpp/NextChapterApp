import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootStack/RootStackParamList';

export type RootNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList,
  'RootStack'
>;
