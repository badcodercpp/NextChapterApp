import React from 'react';
import { act, create } from 'react-test-renderer';
import { Stop } from 'react-native-svg';
import { ForgotPasswordScreen } from '../ForgotPasswordScreen';
import { VerifyIdentityScreen } from '../../VerifyIdentity/VerifyIdentityScreen';

const mockNavigate = jest.fn();
let mockBackground = '#ffffff';

jest.mock('@/components', () => ({
  AppButton: 'AppButton',
  AppCard: 'AppCard',
  AppIcon: 'AppIcon',
  AppInput: 'AppInput',
  AppOtpTimer: 'AppOtpTimer',
  AppPressable: 'AppPressable',
  AppScreen: 'AppScreen',
  AppText: 'AppText',
}));
jest.mock('react-native', () => ({
  ImageBackground: 'ImageBackground',
  ScrollView: 'ScrollView',
  TextInput: 'TextInput',
  View: 'View',
}));
jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  Rect: 'Rect',
  Stop: 'Stop',
}));
jest.mock('lucide-react-native', () => ({
  ArrowRight: 'ArrowRight',
  Clock3: 'Clock3',
  Lock: 'Lock',
  Mail: 'Mail',
  ShieldCheck: 'ShieldCheck',
}));
jest.mock('uniwind', () => ({
  useCSSVariable: () => mockBackground,
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));
jest.mock('../useForgotPassword', () => ({
  useForgotPassword: () => ({
    control: {},
    errors: {},
    clearErrors: jest.fn(),
  }),
}));
jest.mock('../../VerifyIdentity/useVerifyIdentity', () => ({
  useVerifyIdentity: () => ({
    control: {},
    otp: ['', '', '', ''],
    maskedEmail: '',
  }),
}));
jest.mock('@/utils', () => ({ cn: (...values: string[]) => values.join(' ') }));
jest.mock('react-hook-form', () => ({
  Controller: ({ render }: { render: (props: object) => React.ReactNode }) =>
    render({ field: { value: '', onBlur: jest.fn(), onChange: jest.fn() } }),
}));

test.each([
  {
    name: 'forgot password',
    Screen: ForgotPasswordScreen,
    button: 'Send OTP',
    route: 'VerifyIdentity',
  },
  {
    name: 'verify identity',
    Screen: VerifyIdentityScreen,
    button: 'Verify OTP',
    route: 'Login',
  },
])(
  '$name fades its image into the current page background',
  ({ Screen, button, route }) => {
    for (const background of ['#ffffff', '#141129']) {
      mockBackground = background;
      let screen: ReturnType<typeof create>;
      act(() => {
        screen = create(<Screen />);
      });
      const stops = screen!.root.findAllByType(Stop);
      expect(stops.map(stop => stop.props.stopOpacity)).toEqual([0, 1]);
      expect(stops.map(stop => stop.props.stopColor)).toEqual([
        background,
        background,
      ]);
      act(() => screen!.root.findByProps({ title: button }).props.onPress());
      expect(mockNavigate).toHaveBeenLastCalledWith(route);
      act(() => screen!.unmount());
    }
  },
);
