import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateAccountScreen } from '../CreateAccountScreen';

const mockNavigate = jest.fn();
const mockSubmitCreateAccount = jest.fn();
const mockGoogleOnboard = jest.fn();
let mockGoogleLoading = false;

jest.mock('@/components', () => {
  const {
    View,
    Text,
    Pressable,
    TextInput: Input,
  } = jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Pressable,
    AppInput: Input,
    AppIcon: View,
  };
});

jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Path: 'Path',
}));

jest.mock('lucide-react-native', () => ({
  Info: 'Info',
  Mail: 'Mail',
  User: 'User',
  UserPlus: 'UserPlus',
}));

jest.mock('@/navigation/hooks', () => ({
  useScreenHeader: jest.fn(),
  usePreventBackNavigation: jest.fn(),
}));

jest.mock('../useCreateAccount', () => ({
  useCreateAccount: () => {
    const { useFormContext } =
      jest.requireActual<typeof import('react-hook-form')>('react-hook-form');
    const form = useFormContext();
    return {
      ...form,
      errors: form.formState.errors,
      navigation: { navigate: mockNavigate },
      submitCreateAccount: mockSubmitCreateAccount,
    };
  },
}));

jest.mock('@/hooks/useGoogleSignIn', () => ({
  __esModule: true,
  default: () => ({
    doGoogleOnboard: mockGoogleOnboard,
    isGoogleRegisterLoading: mockGoogleLoading,
  }),
}));

function Harness() {
  const form = useForm({
    defaultValues: { createAccount: { fullName: '', email: '' } },
  });
  return (
    <FormProvider {...form}>
      <CreateAccountScreen />
    </FormProvider>
  );
}

let screen: ReactTestRenderer;

beforeEach(() => {
  jest.clearAllMocks();
  mockGoogleLoading = false;
});

afterEach(() => {
  act(() => screen?.unmount());
});

function renderScreen() {
  act(() => {
    screen = create(<Harness />);
  });
  return screen.root;
}

test('preserves the full-name and email step and its submit handler', () => {
  const root = renderScreen();
  expect(
    root.findAllByType(TextInput).map(input => input.props.accessibilityLabel),
  ).toEqual(['Full Name', 'Email Address']);
  act(() => {
    root
      .findByProps({ accessibilityLabel: 'Continue to password' })
      .props.onPress();
  });
  expect(mockSubmitCreateAccount).toHaveBeenCalledTimes(1);
});

test('shows only Google social registration and invokes onboarding', () => {
  const root = renderScreen();
  act(() => {
    root
      .findByProps({ accessibilityLabel: 'Continue with Google' })
      .props.onPress();
  });
  expect(mockGoogleOnboard).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(screen.toJSON())).not.toMatch(/Apple|Facebook/);
});

test('both sign-in controls navigate to login', () => {
  const root = renderScreen();
  act(() => {
    ['Sign In', 'Log in'].forEach(label =>
      root.findByProps({ accessibilityLabel: label }).props.onPress(),
    );
  });
  expect(mockNavigate.mock.calls).toEqual([['Login'], ['Login']]);
  expect(
    root.findByProps({ accessibilityLabel: 'Create Account' }).props
      .accessibilityState.selected,
  ).toBe(true);
});

test('locks competing controls during Google registration', () => {
  mockGoogleLoading = true;
  const root = renderScreen();
  ['Sign In', 'Log in', 'Continue to password', 'Continue with Google'].forEach(
    label => {
      expect(
        root.findByProps({ accessibilityLabel: label }).props.disabled,
      ).toBe(true);
    },
  );
  root.findAllByType(TextInput).forEach(input => {
    expect(input.props.disabled).toBe(true);
  });
  expect(
    root.findByProps({ accessibilityLabel: 'Continue with Google' }).props
      .accessibilityState.busy,
  ).toBe(true);
});
