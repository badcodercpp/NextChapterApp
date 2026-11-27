import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { DrawerHeader } from '../DrawerHeader';
import { DrawerPremiumCard } from '../DrawerPremiumCard';
import { ProfileSummaryCard } from '@/features/Profile/components/ProfileSummaryCard';

let mockAccess: { level: string; premiumPlanName?: string | null } | undefined;

jest.mock('react-native', () => ({ View: 'View' }));
jest.mock('lucide-react-native', () => ({
  ArrowRight: 'ArrowRight',
  Crown: 'Crown',
  Moon: 'Moon',
  Pencil: 'Pencil',
  Sun: 'Sun',
}));
jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  Rect: 'Rect',
  Stop: 'Stop',
}));
jest.mock('uniwind', () => ({ useCSSVariable: () => '#7c3aed' }));
jest.mock('@/components', () => ({
  AppAvatar: 'AppAvatar',
  AppIcon: 'AppIcon',
  AppMountainArtwork: 'AppMountainArtwork',
  AppPressable: 'AppPressable',
  AppText: 'AppText',
}));
jest.mock('@/components/foundation/AppAvatar', () => ({
  AppAvatar: 'AppAvatar',
}));
jest.mock('@/components/foundation/AppIcon', () => ({ AppIcon: 'AppIcon' }));
jest.mock('@/components/foundation/AppText', () => ({ AppText: 'AppText' }));
jest.mock('@/__generated__/graphql', () => ({
  AccessLevel: { Premium: 'PREMIUM' },
}));
jest.mock('@/state/selectors', () => ({
  selectMe: () => ({ data: { displayName: 'Test' } }),
  selectApplicationConfig: () => ({ data: {} }),
  selectMyAccess: () => ({ data: mockAccess }),
  selectIsPremiumUser: () => mockAccess?.level === 'PREMIUM',
}));
jest.mock('react-redux', () => ({
  useSelector: (selector: () => unknown) => selector(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        'app.locale.premium.badge': 'Premium member',
        'app.locale.premium.plan': 'Premium',
        'app.locale.premium.freePlan': 'Free Plan',
        'app.locale.premium.go': 'Go Premium',
        'app.locale.premium.upgrade': 'Upgrade Premium',
      }[key] ?? key),
  }),
}));
jest.mock('@/utils', () => ({
  getGreetingKey: () => 'greeting',
  toHttpsURL: (url: string) => url,
}));

function renderMembership() {
  let screen: ReactTestRenderer;
  act(() => {
    screen = create(
      <>
        <DrawerHeader />
        <ProfileSummaryCard />
      </>,
    );
  });
  return screen!;
}

test('shows the purchased plan and premium badges in drawer and profile', () => {
  mockAccess = { level: 'PREMIUM', premiumPlanName: '90 Day Recovery' };
  const screen = renderMembership();
  expect(JSON.stringify(screen.toJSON())).toContain('90 Day Recovery');
  expect(
    screen.root.findAllByProps({ accessibilityLabel: 'Premium member' }),
  ).toHaveLength(2);
  act(() => screen.unmount());
});

test('does not show premium badges for free or expired access', () => {
  for (const level of ['FREE_TRIAL', 'FREE_EXPIRED']) {
    mockAccess = { level, premiumPlanName: 'Old plan' };
    const screen = renderMembership();
    expect(JSON.stringify(screen.toJSON())).toContain('Free Plan');
    expect(JSON.stringify(screen.toJSON())).not.toContain('Old plan');
    expect(
      screen.root.findAllByProps({ accessibilityLabel: 'Premium member' }),
    ).toHaveLength(0);
    act(() => screen.unmount());
  }
});

test('does not claim free access while access is unknown', () => {
  mockAccess = undefined;
  const screen = renderMembership();
  expect(JSON.stringify(screen.toJSON())).not.toContain('Free Plan');
  act(() => screen.unmount());
});

test('uses a generic premium label when the purchase name is unavailable', () => {
  mockAccess = { level: 'PREMIUM', premiumPlanName: null };
  const screen = renderMembership();
  expect(JSON.stringify(screen.toJSON())).toContain('"Premium"');
  expect(JSON.stringify(screen.toJSON())).not.toContain('Free Plan');
  act(() => screen.unmount());
});

test('updates the plan and badges when access changes', () => {
  mockAccess = { level: 'FREE_TRIAL' };
  const screen = renderMembership();
  mockAccess = { level: 'PREMIUM', premiumPlanName: 'Annual Recovery' };
  act(() =>
    screen.update(
      <>
        <DrawerHeader />
        <ProfileSummaryCard />
      </>,
    ),
  );
  expect(JSON.stringify(screen.toJSON())).toContain('Annual Recovery');
  expect(
    screen.root.findAllByProps({ accessibilityLabel: 'Premium member' }),
  ).toHaveLength(2);
  act(() => screen.unmount());
});

test('updates the premium action label without changing its navigation', () => {
  const onPress = jest.fn();
  mockAccess = { level: 'FREE_TRIAL' };
  let screen: ReactTestRenderer;
  act(() => {
    screen = create(<DrawerPremiumCard onPress={onPress} />);
  });
  const freeButton = screen!.root.findByProps({
    accessibilityLabel: 'Go Premium',
  });
  expect(JSON.stringify(screen!.toJSON())).toContain('Go Premium');
  act(() => freeButton.props.onPress());

  mockAccess = { level: 'PREMIUM' };
  act(() => screen!.update(<DrawerPremiumCard onPress={onPress} />));
  const premiumButton = screen!.root.findByProps({
    accessibilityLabel: 'Upgrade Premium',
  });
  expect(JSON.stringify(screen!.toJSON())).toContain('Upgrade Premium');
  act(() => premiumButton.props.onPress());
  expect(onPress).toHaveBeenCalledTimes(2);
  act(() => screen!.unmount());
});
