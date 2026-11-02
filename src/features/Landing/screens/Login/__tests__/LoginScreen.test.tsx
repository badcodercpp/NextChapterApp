import React from 'react';
import { TextInput } from 'react-native';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginScreen } from '../LoginScreen';

const mockNavigate = jest.fn();
const mockSubmitLogin = jest.fn();
const mockGoogleSignIn = jest.fn();
const mockSetShowPassword = jest.fn();
let mockIsLoading = false;
let mockGoogleLoading = false;
let mockShowPassword = false;

jest.mock('@/components', () => {
  const {
    View,
    Text,
    Pressable: Button,
    TextInput: Input,
  } = jest.requireActual<typeof import('react-native')>('react-native');
  return {
    AppScreen: View,
    AppText: Text,
    AppPressable: Button,
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
  ArrowRight: 'ArrowRight',
  Eye: 'Eye',
  EyeOff: 'EyeOff',
  Lock: 'Lock',
  Mail: 'Mail',
}));

jest.mock('@/navigation/hooks', () => ({
  useScreenHeader: jest.fn(),
  usePreventBackNavigation: jest.fn(),
}));

jest.mock('../useLogin', () => ({
  useLogin: () => {
    const { useFormContext } =
      jest.requireActual<typeof import('react-hook-form')>('react-hook-form');
    const form = useFormContext();
    return {
      ...form,
      errors: form.formState.errors,
      navigation: { navigate: mockNavigate },
      submitLogin: mockSubmitLogin,
      isLoading: mockIsLoading,
      showPassword: mockShowPassword,
      setShowPassword: mockSetShowPassword,
    };
  },
}));

jest.mock('@/hooks/useGoogleSignIn', () => ({
  __esModule: true,
  default: () => ({
    doGoogleSignIn: mockGoogleSignIn,
    isGoogleLoginLoading: mockGoogleLoading,
  }),
}));

function Harness() {
  const form = useForm({
    defaultValues: { login: { email: '', password: '' } },
  });
  return (
    <FormProvider {...form}>
      <LoginScreen />
    </FormProvider>
  );
}

let screen: ReactTestRenderer;

beforeEach(() => {
  jest.clearAllMocks();
  mockIsLoading = false;
  mockGoogleLoading = false;
  mockShowPassword = false;
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

test('offers only Google social login and preserves authentication handlers', () => {
  const root = renderScreen();
  const signIn = root.findByProps({ accessibilityLabel: 'Sign In' });
  const google = root.findByProps({
    accessibilityLabel: 'Continue with Google',
  });
  act(() => {
    signIn.props.onPress();
    google.props.onPress();
  });
  expect(mockSubmitLogin).toHaveBeenCalledTimes(1);
  expect(mockGoogleSignIn).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(screen.toJSON())).not.toMatch(/Apple|Facebook/);
});

test('preserves account creation, recovery, and password visibility controls', () => {
  const root = renderScreen();
  const password = root.findAllByType(TextInput)[1];
  expect(password.props.secureTextEntry).toBe(true);
  act(() => password.props.onEndIconPress());
  expect(mockSetShowPassword).toHaveBeenCalledWith(true);

  act(() => {
    ['Create Account', 'Forgot Password', 'Create an account'].forEach(label =>
      root.findByProps({ accessibilityLabel: label }).props.onPress(),
    );
  });
  expect(mockNavigate.mock.calls).toEqual([
    ['CreateAccount'],
    ['ForgotPassword'],
    ['CreateAccount'],
  ]);
});

test.each(['email', 'google'])(
  'disables competing actions while %s authentication is pending',
  provider => {
    mockIsLoading = provider === 'email';
    mockGoogleLoading = provider === 'google';
    const root = renderScreen();
    [
      'Sign In',
      'Continue with Google',
      'Create Account',
      'Forgot Password',
      'Create an account',
    ].forEach(label => {
      expect(
        root.findByProps({ accessibilityLabel: label }).props.disabled,
      ).toBe(true);
    });
    root.findAllByType(TextInput).forEach(input => {
      expect(input.props.disabled).toBe(true);
    });
    const button = root.findByProps({
      accessibilityLabel:
        provider === 'email' ? 'Sign In' : 'Continue with Google',
    });
    expect(button.props.accessibilityState.busy).toBe(true);
  },
);
