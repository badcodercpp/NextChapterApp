import { AppInput, AppText } from '@/components';
import { Mail, Pencil, Phone } from 'lucide-react-native';

import { View } from 'react-native';

interface ContactSectionProps {
  phone: string;
  email: string;
  onPhoneChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
  onEditPhone?: () => void;
  onEditEmail?: () => void;
}

export function ContactSection({
  phone,
  email,
  onPhoneChange,
  onEmailChange,
  onEditPhone,
  onEditEmail,
}: ContactSectionProps) {
  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mb-2 flex-row items-center">
        <View className="mr-3 h-7 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-text-muted"
        >
          Contact
        </AppText>
      </View>

      {/* Mobile Number */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Mobile Number
      </AppText>
      <AppInput
        value={phone}
        onChangeText={onPhoneChange}
        startIcon={Phone}
        endIcon={Pencil}
        onEndIconPress={onEditPhone}
        disabled={true}
        className="mb-4"
        inputClassName="text-text-secondary"
      />

      {/* Email */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Email Address
      </AppText>
      <AppInput
        value={email}
        onChangeText={onEmailChange}
        startIcon={Mail}
        endIcon={Pencil}
        onEndIconPress={onEditEmail}
        disabled={true}
        inputClassName="text-text-secondary"
      />
    </View>
  );
}
