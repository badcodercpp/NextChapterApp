import React from 'react';
import { act, create } from 'react-test-renderer';
import { AppPatternArtwork, AppText } from '@/components';
import { PremiumScreen } from '../PremiumScreen';

const mockHandlePurchase = jest.fn();
const mockPlans = [
  {
    id: 'plan-7',
    name: '7 Days Premium Access',
    durationDays: 7,
    baseAmount: 175000,
    payableAmount: 157525,
    discountPercentage: 10,
    currency: 'INR',
  },
  {
    id: 'plan-15',
    name: '15 Days Premium Access',
    durationDays: 15,
    baseAmount: 375000,
    payableAmount: 333000,
    discountPercentage: 11.2,
    currency: 'INR',
  },
];
let mockAvailablePlans = mockPlans;
let mockAccess: { level: string; premiumPlanId: string | null } | null = {
  level: 'FREE_TRIAL',
  premiumPlanId: null,
};
let mockIsFetching = false;
let mockIsError = false;
const mockRefetch = jest.fn(() => ({ unwrap: () => Promise.resolve() }));

jest.mock('react-native', () => ({
  StyleSheet: { absoluteFill: {} },
  View: 'View',
}));
jest.mock('@/components', () => ({
  APP_PATTERN_ARTWORK_VARIANTS: [
    'rings',
    'sparkles',
    'grid',
    'waves',
    'bubbles',
    'stripes',
  ],
  AppHeroArtwork: 'AppHeroArtwork',
  AppIcon: 'AppIcon',
  AppLoadingModal: 'AppLoadingModal',
  AppMountainArtwork: 'AppMountainArtwork',
  AppPatternArtwork: 'AppPatternArtwork',
  AppPressable: 'AppPressable',
  AppScreen: 'AppScreen',
  AppText: 'AppText',
}));
jest.mock('lucide-react-native', () => ({
  ArrowRight: 'ArrowRight',
  CalendarDays: 'CalendarDays',
  Check: 'Check',
  Crown: 'Crown',
  Flower2: 'Flower2',
  Heart: 'Heart',
  ShieldCheck: 'ShieldCheck',
  Sparkles: 'Sparkles',
  Sprout: 'Sprout',
  Star: 'Star',
  Sun: 'Sun',
}));
jest.mock('@/__generated__/graphql', () => ({
  AccessLevel: { Premium: 'PREMIUM' },
  useMyAccessQuery: () => ({
    data: mockAccess ? { myAccess: mockAccess } : undefined,
    isFetching: mockIsFetching,
    isError: mockIsError,
    refetch: mockRefetch,
  }),
}));
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (callback: () => void) =>
    jest.requireActual('react').useEffect(callback, [callback]),
}));
jest.mock('@/features/Premium/constants/plans', () => ({
  BENEFITS: [],
  HIGHLIGHTS: [],
}));
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@/utils', () => ({ cn: (...values: string[]) => values.join(' ') }));
jest.mock('uniwind', () => ({ useCSSVariable: () => '#7c3aed' }));
jest.mock('@/features/Premium/hooks/usePlan', () => ({
  usePlan: () => ({
    isPending: false,
    handlePurchase: mockHandlePurchase,
    availablePlans: mockAvailablePlans,
  }),
}));

beforeEach(() => {
  mockAvailablePlans = mockPlans;
  mockAccess = { level: 'FREE_TRIAL', premiumPlanId: null };
  mockIsFetching = false;
  mockIsError = false;
  mockHandlePurchase.mockClear();
  mockRefetch.mockClear();
});

test('displays each plan with rupee prices, duration, and best value', () => {
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const cards = screen!.root.findAllByProps({ accessibilityRole: 'radio' });
  expect(cards).toHaveLength(2);
  expect(cards[0].findAllByProps({ testID: 'plan-radio' })).toHaveLength(1);
  const firstPrices = cards[0]
    .findAllByType(AppText)
    .map(node => node.props.children);
  const secondPrices = cards[1]
    .findAllByType(AppText)
    .map(node => node.props.children);
  expect(firstPrices).toContain('₹1,750');
  expect(firstPrices).toContain('₹1,575.25');
  expect(cards[0].props.accessibilityLabel).toContain('full access for 7 days');
  expect(secondPrices).toContain('₹3,750');
  expect(secondPrices).toContain('₹3,330');
  expect(cards[1].props.accessibilityLabel).toContain('best value');
  expect(JSON.stringify(screen!.toJSON())).toContain('Best Value');
  act(() => screen!.unmount());
});

test('purchases the selected real plan and defaults to the first plan', () => {
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const cards = screen!.root.findAllByProps({ accessibilityRole: 'radio' });
  const button = screen!.root.findByProps({
    accessibilityLabel: 'Upgrade to Premium',
  });
  expect(cards[0].props.accessibilityState.selected).toBe(true);
  act(() => button.props.onPress());
  expect(mockHandlePurchase).toHaveBeenLastCalledWith('plan-7');
  act(() => cards[1].props.onPress());
  expect(cards[1].props.accessibilityState.selected).toBe(true);
  act(() => button.props.onPress());
  expect(mockHandlePurchase).toHaveBeenLastCalledWith('plan-15');
  act(() => screen!.unmount());
});

test('hides discounts and best value when a single plan has no discount', () => {
  mockAvailablePlans = [
    {
      ...mockPlans[0],
      durationDays: 1,
      baseAmount: 25000,
      payableAmount: 25000,
      discountPercentage: 0,
    },
  ];
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const card = screen!.root.findByProps({ accessibilityRole: 'radio' });
  expect(card.props.accessibilityLabel).toContain('full access for 1 day');
  expect(JSON.stringify(screen!.toJSON())).not.toContain('Best Value');
  expect(JSON.stringify(screen!.toJSON())).not.toContain('% Off');
  act(() => screen!.unmount());
});

test('applies the design to every plan and marks the lowest daily price', () => {
  mockAvailablePlans = [7, 15, 30, 45, 60, 75, 90].map((days, index) => ({
    ...mockPlans[0],
    id: `plan-${days}`,
    name: `${days} Days Premium Access`,
    durationDays: days,
    baseAmount: days * 25000,
    payableAmount: days * (24000 - index * 1000),
  }));
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const cards = screen!.root.findAllByProps({ accessibilityRole: 'radio' });
  expect(cards).toHaveLength(7);
  const artwork = cards.map(card => card.findByType(AppPatternArtwork));
  expect(new Set(artwork.map(item => item.props.icon)).size).toBe(7);
  expect(cards[6].props.accessibilityLabel).toContain(
    'full access for 90 days, best value',
  );
  expect(cards[1].props.accessibilityLabel).not.toContain('best value');
  act(() => screen!.unmount());
});

test('marks the active plan subscribed and cannot purchase it', () => {
  mockAccess = { level: 'PREMIUM', premiumPlanId: 'plan-7' };
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const subscribed = screen!.root
    .findAllByProps({ accessibilityRole: 'button' })
    .find(node => node.props.accessibilityLabel?.includes('subscribed'));
  expect(subscribed?.props.disabled).toBe(true);
  expect(subscribed?.findAllByProps({ testID: 'plan-radio' })).toHaveLength(0);
  expect(JSON.stringify(screen!.toJSON())).toContain('Subscribed');

  const selectable = screen!.root.findByProps({ accessibilityRole: 'radio' });
  expect(selectable.props.accessibilityState.checked).toBe(true);
  expect(selectable.findAllByProps({ testID: 'plan-radio' })).toHaveLength(1);
  act(() => subscribed?.props.onPress());
  act(() =>
    screen!.root
      .findByProps({ accessibilityLabel: 'Upgrade to Premium' })
      .props.onPress(),
  );
  expect(mockHandlePurchase).toHaveBeenCalledWith('plan-15');
  act(() => screen!.unmount());
});

test('prevents purchases when the active plan cannot be verified', () => {
  mockAccess = { level: 'PREMIUM', premiumPlanId: null };
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const button = screen!.root.findByProps({
    accessibilityLabel: 'Upgrade to Premium',
  });
  expect(button.props.disabled).toBe(true);
  expect(JSON.stringify(screen!.toJSON())).toContain(
    'Unable to verify your current plan.',
  );
  expect(mockRefetch).toHaveBeenCalledTimes(1);
  act(() =>
    screen!.root
      .findByProps({ accessibilityLabel: 'Retry checking your plan' })
      .props.onPress(),
  );
  expect(mockRefetch).toHaveBeenCalledTimes(2);
  act(() => button.props.onPress());
  expect(mockHandlePurchase).not.toHaveBeenCalled();
  act(() => screen!.unmount());
});

test('prevents purchase while access is being refreshed or failed', () => {
  for (const failed of [false, true]) {
    mockIsFetching = !failed;
    mockIsError = failed;
    let screen: ReturnType<typeof create>;
    act(() => {
      screen = create(<PremiumScreen />);
    });
    const button = screen!.root.findByProps({
      accessibilityLabel: 'Upgrade to Premium',
    });
    expect(button.props.disabled).toBe(true);
    act(() => button.props.onPress());
    expect(mockHandlePurchase).not.toHaveBeenCalled();
    act(() => screen!.unmount());
  }
});

test('clears a selected plan when it becomes subscribed', () => {
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const cards = screen!.root.findAllByProps({ accessibilityRole: 'radio' });
  act(() => cards[1].props.onPress());
  mockAccess = { level: 'PREMIUM', premiumPlanId: 'plan-15' };
  act(() => screen!.update(<PremiumScreen />));
  act(() =>
    screen!.root
      .findByProps({ accessibilityLabel: 'Upgrade to Premium' })
      .props.onPress(),
  );
  expect(mockHandlePurchase).toHaveBeenCalledWith('plan-7');
  act(() => screen!.unmount());
});

test('disables purchase if the subscribed plan is the only plan', () => {
  mockAvailablePlans = [mockPlans[0]];
  mockAccess = { level: 'PREMIUM', premiumPlanId: 'plan-7' };
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  expect(
    screen!.root.findByProps({ accessibilityLabel: 'Upgrade to Premium' }).props
      .disabled,
  ).toBe(true);
  act(() => screen!.unmount());
});

test('disables purchase if no plans are available', () => {
  mockAvailablePlans = [];
  let screen: ReturnType<typeof create>;
  act(() => {
    screen = create(<PremiumScreen />);
  });
  const button = screen!.root.findByProps({
    accessibilityLabel: 'Upgrade to Premium',
  });
  expect(button.props.disabled).toBe(true);
  act(() => button.props.onPress());
  expect(mockHandlePurchase).not.toHaveBeenCalled();
  act(() => screen!.unmount());
});
