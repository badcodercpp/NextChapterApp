import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import { useLayoutEffect } from 'react';

type UseScreenHeaderOptions = {
  title?: string;
  backDisabled?: boolean;
  headerShown?: boolean;
};

export const useScreenHeader = ({
  backDisabled = false,
  headerShown = true,
}: UseScreenHeaderOptions = {}) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown,

      gestureEnabled: !backDisabled,
      backDisabled: backDisabled,
    });
  }, [navigation, backDisabled, headerShown]);
};
