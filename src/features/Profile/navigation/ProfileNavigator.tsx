import {
  EditProfileScreen,
  EditProfileSuccessScreen,
  ProfileScreen,
} from '../screens';
import {
  NavigatorAppHeader,
} from '@/components';

import { DeleteProfileScreen } from '@/features/Profile/screens';
import { ProfileRoutes } from './ProfileRoutes';
import { ProfileStackParamList } from './ProfileStackParamList';
import { ProfileScreenHeader } from './ProfileScreenHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Profile',
          header: ProfileScreenHeader,
        }}
        name={ProfileRoutes.ProfileScreen}
        component={ProfileScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Edit Profile',
          header: ProfileScreenHeader,
        }}
        name={ProfileRoutes.EditProfileScreen}
        component={EditProfileScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: NavigatorAppHeader,
        }}
        name={ProfileRoutes.DeleteProfileScreen}
        component={DeleteProfileScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Updating Profile',
          header: ProfileScreenHeader,
        }}
        name={ProfileRoutes.EditProfileSuccessScreen}
        component={EditProfileSuccessScreen}
      />
    </Stack.Navigator>
  );
}
