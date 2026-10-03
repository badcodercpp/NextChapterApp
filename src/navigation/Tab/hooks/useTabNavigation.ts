import { TabNavigationProp } from '../type';
import { useNavigation } from '@react-navigation/native';

export const useTabNavigation = () => useNavigation<TabNavigationProp>();
