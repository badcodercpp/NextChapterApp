import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import { AppHeader } from '@/components/foundation/AppHeader';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

type UseScreenHeaderOptions = {
  title?: string;
  backDisabled?: boolean;
  headerShown?: boolean;
};

export const useScreenHeader = ({
  title,
  backDisabled = false,
  headerShown = true,
}: UseScreenHeaderOptions = {}) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown,

      gestureEnabled: !backDisabled,

      header: (props: NativeStackHeaderProps) => (
        <AppHeader
          title={title ?? props.options.title}
          backDisabled={backDisabled}
        />
      ),
    });
  }, [navigation, title, backDisabled, headerShown]);
};
