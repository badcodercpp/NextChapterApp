import { DrawerNavigator } from '../Drawer/DrawerNavigator';
import { LandingNavigator } from '@/features/Landing/navigation/LandingNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { RootRoutes } from './RootRoutes';
import { RootStackParamList } from './RootStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen
          name={RootRoutes.LandingStack}
          component={LandingNavigator}
        />
        <Root.Screen name={RootRoutes.Main} component={DrawerNavigator} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
