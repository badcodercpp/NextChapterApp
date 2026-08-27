import { selectAuthStatus, selectIsLoggedIn } from '@/state/selectors';

import { AppLoader } from '@/components';
import { DrawerNavigator } from '../Drawer/DrawerNavigator';
import { LandingNavigator } from '@/features/Landing/navigation/LandingNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { RootRoutes } from './RootRoutes';
import { RootStackParamList } from './RootStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@/navigation/RootNavigation';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';
import { useSelector } from 'react-redux';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  useAuthBootstrap();

  const authStatus = useSelector(selectAuthStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (authStatus === 'checking') {
    return <AppLoader title="Please wait preparing your account ..." />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator screenOptions={{ headerShown: false }} id="RootStack">
        {isLoggedIn ? (
          <Root.Screen name={RootRoutes.Main} component={DrawerNavigator} />
        ) : (
          <Root.Screen
            name={RootRoutes.LandingStack}
            component={LandingNavigator}
          />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}
