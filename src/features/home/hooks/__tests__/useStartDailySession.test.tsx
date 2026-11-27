import React from 'react';
import { act, create } from 'react-test-renderer';
import { useStartDailySession } from '../useStartDailySession';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';

const mockOpenPremium = jest.fn();
const mockCanProceed = jest.fn(() => true);
const mockNavigate = jest.fn();
let mockLocked = false;
let startSession: () => Promise<void>;

jest.mock('@/components/foundation/AppCard/CardAccess', () => ({
  useCardAccess: () => ({
    locked: mockLocked,
    openPremium: mockOpenPremium,
  }),
}));
jest.mock('@/hooks', () => ({
  useUserAccess: () => ({ canProceed: mockCanProceed }),
}));
jest.mock('react-redux', () => ({
  useSelector: () => ({
    data: null,
    loading: false,
    isError: false,
  }),
}));
jest.mock('@/state/selectors', () => ({ selectActiveDailySession: jest.fn() }));
jest.mock(
  '@/features/DailySession/hooks/useActiveSessionStepNavigation',
  () => ({
    useActiveSessionStepNavigation: () => ({
      getNextStepScreenName: () => 'Question',
    }),
  }),
);
jest.mock('../useHomeBootstrapQueries', () => ({
  useHomeBootstrapQueries: () => ({
    triggerLazyActiveDailySessionQuery: jest.fn(),
  }),
}));
jest.mock('@/navigation/Tab/hooks/useTabNavigation', () => ({
  useTabNavigation: () => ({ navigate: mockNavigate }),
}));

function HookHarness() {
  startSession = useStartDailySession().startNewOrResumeCurrentDailySession;
  return null;
}

afterEach(() => {
  jest.clearAllMocks();
  mockLocked = false;
});

test('redirects an expired user to premium rather than starting a session', async () => {
  mockLocked = true;
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<HookHarness />);
  });
  await act(async () => startSession());
  expect(mockOpenPremium).toHaveBeenCalledTimes(1);
  expect(mockCanProceed).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
  act(() => screen!.unmount());
});

test('keeps session navigation unchanged when access is active', async () => {
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<HookHarness />);
  });
  await act(async () => startSession());
  expect(mockNavigate).toHaveBeenCalledWith(TabRoutes.DailySessionTab, {
    screen: 'Question',
  });
  expect(mockOpenPremium).not.toHaveBeenCalled();
  act(() => screen!.unmount());
});
