import { AppInput, AppText } from '@/components';
import { FileText, Pencil, UserRound } from 'lucide-react-native';

import { View } from 'react-native';

interface BasicInfoSectionProps {
  fullName: string;
  username: string;
  bio: string;

  onFullNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onBioChange: (value: string) => void;
}

export function BasicInfoSection({
  fullName,
  bio,
  onFullNameChange,
  onBioChange,
}: BasicInfoSectionProps) {
  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mb-2 flex-row items-center">
        <View className="mr-3 h-7 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="sm"
          className="font-semibold uppercase tracking-[2px] text-text-muted"
        >
          Basic Info
        </AppText>
      </View>

      {/* Full Name */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Full Name
      </AppText>
      <AppInput
        value={fullName}
        onChangeText={onFullNameChange}
        startIcon={UserRound}
        endIcon={Pencil}
        inputClassName="text-text-secondary"
        className="mb-4"
      />

      {/* Bio */}
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Bio
      </AppText>
      <AppInput
        value={bio}
        multiline
        onChangeText={onBioChange}
        startIcon={FileText}
        endIcon={Pencil}
        inputClassName="text-text-secondary"
        className="mb-0"
      />
    </View>
  );
}
