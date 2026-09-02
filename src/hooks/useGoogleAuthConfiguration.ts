import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import { useCallback, useEffect } from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const useGoogleAuthConfiguration = () => {
  const configureGoogleSignIn = useCallback(async () => {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
      });
      console.log(
        'Google Sign-In configured successfully!',
        GOOGLE_IOS_CLIENT_ID,
      );
    } catch (error) {
      console.error('Google config failed: ', error);
    }
  }, []);

  useEffect(() => {
    configureGoogleSignIn();
  }, [configureGoogleSignIn]);
};
