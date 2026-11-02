import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import { VerifyEmailScreen } from '../VerifyEmailScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@/components', () => {
  const { View, Text, Pressable } =
    jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Pressable,
    AppIcon: View,
    AppOtpTimer: jest.requireActual(
      '@/components/foundation/AppOtpTimer/AppOtpTimer',
    ).AppOtpTimer,
  };
});

jest.mock('@/components/foundation/AppText', () => ({
  AppText: jest.requireActual('react-native').Text,
}));

jest.mock('lucide-react-native', () => ({
  ChevronLeft: 'ChevronLeft',
  Clock3: 'Clock3',
  Delete: 'Delete',
  Mail: 'Mail',
  ShieldCheck: 'ShieldCheck',
  Smartphone: 'Smartphone',
}));

jest.mock('@/navigation/hooks', () => ({ useScreenHeader: jest.fn() }));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack }),
}));
jest.mock('@/form', () => jest.requireActual('@/form/schema/verifyEmail'));
jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils/cn'),
  ...jest.requireActual('@/utils/fieldError'),
  ...jest.requireActual('@/utils/maskEmail'),
}));

function Harness() {
  const form = useForm({
    defaultValues: {
      createAccount: { email: 'reader@example.com' },
      verifyEmail: { otp: ['', '', '', ''] },
    },
  });
  return (
    <FormProvider {...form}>
      <VerifyEmailScreen />
    </FormProvider>
  );
}

let screen: ReactTestRenderer;

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  act(() => {
    screen = create(<Harness />);
  });
});
afterEach(() => {
  act(() => screen.unmount());
  jest.useRealTimers();
});

async function press(label: string) {
  await act(async () => {
    await screen.root
      .findByProps({ accessibilityLabel: label })
      .props.onPress();
  });
}

function digits() {
  return screen.root.findAllByType(TextInput).map(input => input.props.value);
}

test('preserves four OTP inputs and masks the registration email', () => {
  expect(digits()).toEqual(['', '', '', '']);
  const rendered = JSON.stringify(screen.toJSON());
  expect(rendered).not.toContain('reader@example.com');
  expect(rendered).toContain('4');
});

test('manual keypad fills digits, replaces selected digits, and deletes backwards', async () => {
  for (const digit of ['1', '2', '3', '4']) {
    await press(`Enter ${digit}`);
  }
  expect(digits()).toEqual(['1', '2', '3', '4']);
  await press('Delete digit');
  expect(digits()).toEqual(['1', '2', '3', '']);
  await press('Delete digit');
  expect(digits()).toEqual(['1', '2', '', '']);
  await act(async () => {
    screen.root.findAllByType(TextInput)[0].props.onFocus();
  });
  await press('Enter 9');
  expect(digits()).toEqual(['9', '2', '', '']);
});

test('accepts a pasted code and filters non-numeric characters', async () => {
  await act(async () => {
    screen.root.findAllByType(TextInput)[0].props.onChangeText('1a23456');
  });
  expect(digits()).toEqual(['1', '2', '3', '4']);
});

test('does not navigate on incomplete OTP and continues to Reminder when complete', async () => {
  await press('Verify OTP');
  expect(mockNavigate).not.toHaveBeenCalled();
  await act(async () => {
    screen.root.findAllByType(TextInput)[0].props.onChangeText('1234');
  });
  await press('Verify OTP');
  expect(mockNavigate).toHaveBeenCalledWith('Reminder');
});

test('preserves the two-minute resend cooldown', async () => {
  await press('Resend OTP');
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Resend OTP' }).props
      .disabled,
  ).toBe(true);
  expect(JSON.stringify(screen.toJSON())).toContain('02:00');
  for (let second = 0; second < 120; second++) {
    act(() => jest.advanceTimersByTime(1000));
  }
  expect(
    screen.root.findByProps({ accessibilityLabel: 'Resend OTP' }).props
      .disabled,
  ).toBe(false);
});

test('supports back navigation and changing the email', async () => {
  await press('Go back');
  expect(mockGoBack).toHaveBeenCalledTimes(1);
  await press('Change email');
  expect(mockNavigate).toHaveBeenCalledWith('CreateAccount');
});
