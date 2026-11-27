import React, { useContext } from 'react';
import { Text } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { CardAccessContext } from '@/components/foundation/AppCard/CardAccess';
import { DrawerRoutes } from '../DrawerRoutes';
import { FeatureCardAccessProvider } from '../FeatureCardAccessProvider';

let mockLevel = 'FREE_TRIAL';
const mockRefreshAccess = jest.fn(() => ({
  unwrap: () => Promise.resolve(),
}));

jest.mock('@/components/foundation/AppCard/CardAccess', () => ({
  CardAccessContext: jest.requireActual('react').createContext(null),
}));
jest.mock('@/__generated__/graphql', () => ({
  useLazyMyAccessQuery: () => [mockRefreshAccess],
}));
jest.mock('@/state/selectors', () => ({
  selectIsFreeTrialExpiredUser: () => mockLevel === 'FREE_EXPIRED',
}));
jest.mock('react-redux', () => ({
  useSelector: (selector: () => boolean) => selector(),
}));
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (callback: () => void) =>
    jest.requireActual('react').useEffect(callback, [callback]),
}));

function Card() {
  const access = useContext(CardAccessContext);
  return (
    <Text onPress={access?.openPremium}>
      {access?.locked ? 'locked' : 'open'}
    </Text>
  );
}

test('refreshes access and updates card locks when the access level changes', async () => {
  const navigate = jest.fn();
  const navigation = { navigate };
  let screen: ReactTestRenderer;
  const render = () => (
    <FeatureCardAccessProvider navigation={navigation}>
      <Card />
    </FeatureCardAccessProvider>
  );

  await act(async () => {
    screen = create(render());
  });
  expect(mockRefreshAccess).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(screen!.toJSON())).toContain('open');

  mockLevel = 'FREE_EXPIRED';
  act(() => screen!.update(render()));
  expect(JSON.stringify(screen!.toJSON())).toContain('locked');
  act(() => screen!.root.findByType(Text).props.onPress());
  expect(navigate).toHaveBeenCalledWith(DrawerRoutes.Premium);

  mockLevel = 'PREMIUM';
  act(() => screen!.update(render()));
  expect(JSON.stringify(screen!.toJSON())).toContain('open');
  act(() => screen!.unmount());
});
