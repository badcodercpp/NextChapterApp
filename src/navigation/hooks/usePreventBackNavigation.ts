import { BackHandler, Platform } from 'react-native';

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const usePreventBackNavigation = (isBlocked: boolean) => {
  const navigation = useNavigation();

  /**
   * Blocks React Navigation back actions.
   *
   * Handles:
   * - Header back button
   * - iOS swipe back gesture
   * - navigation.goBack()
   * - Stack pop actions
   */
  useEffect(() => {
    if (!isBlocked) {
      return;
    }

    const unsubscribe = navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });

    return unsubscribe;
  }, [navigation, isBlocked]);

  /**
   * Blocks Android hardware back button.
   */
  useEffect(() => {
    if (!isBlocked || Platform.OS !== 'android') {
      return;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => subscription.remove();
  }, [isBlocked]);
};
