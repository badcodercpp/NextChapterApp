import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import { NativeStackHeaderItemProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

type UseScreenHeaderOptions = {
  title?: string;
  backDisabled?: boolean;
  headerShown?: boolean;
  headerRight?: (props: NativeStackHeaderItemProps) => React.ReactNode;
};

export const useScreenHeader = ({
  backDisabled = false,
  headerShown = true,
  headerRight,
}: UseScreenHeaderOptions = {}) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown,

      gestureEnabled: !backDisabled,
      backDisabled: backDisabled,
      headerRight,
    });
  }, [navigation, backDisabled, headerShown, headerRight]);
};
