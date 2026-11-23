import { NavigatorAppDrawerScreenHeader, appHeaderOptions } from '@/components';

import { ReferToFriendScreen } from '../screens/ReferToFriendScreen';
import { ReferralRewardsScreen } from '../screens/ReferralRewardsScreen';
import type { ReferToFriendStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ReferToFriendStackParamList>();

export function ReferToFriendNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: NavigatorAppDrawerScreenHeader,
      }}
    >
      <Stack.Screen
        name="ReferToFriendScreen"
        component={ReferToFriendScreen}
        options={appHeaderOptions({ title: 'Refer a Friend' })}
      />
      <Stack.Screen
        name="ReferralRewards"
        component={ReferralRewardsScreen}
        options={appHeaderOptions({ title: 'Referral Rewards' })}
      />
    </Stack.Navigator>
  );
}
