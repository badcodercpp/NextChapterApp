import { AppIcon, AppPressable, AppText } from '@/components';
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Download,
  LogOut,
  Shield,
  UserRound,
} from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

interface AccountSettingItem {
  id: string;
  title: string;
  icon: typeof UserRound;
  destructive?: boolean;
}

interface AccountSettingsProps {
  onItemPress?: (item: AccountSettingItem) => void;
  version?: string;
}

const ACCOUNT_ITEMS: AccountSettingItem[] = [
  {
    id: 'personal-information',
    title: 'Personal Information',
    icon: UserRound,
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    icon: Shield,
  },
  {
    id: 'notification-preferences',
    title: 'Notification Preferences',
    icon: Bell,
  },
  {
    id: 'export-data',
    title: 'Export My Data',
    icon: Download,
  },
  {
    id: 'help-support',
    title: 'Help & Support',
    icon: CircleHelp,
  },
  {
    id: 'sign-out',
    title: 'Sign Out',
    icon: LogOut,
    destructive: true,
  },
];

function AccountRow({
  item,
  isLast,
  onPress,
}: {
  item: AccountSettingItem;
  isLast: boolean;
  onPress?: () => void;
}) {
  return (
    <AppPressable
      onPress={onPress}
      className={cn(
        'flex-row items-center px-4 py-3',
        !isLast && 'border-b border-white/10',
      )}
    >
      {/* Icon */}
      <View
        className={cn(
          'h-10 w-10 items-center justify-center rounded-full',
          item.destructive ? 'bg-red-500/10' : 'bg-white/[0.06]',
        )}
      >
        <AppIcon
          icon={item.icon}
          size={24}
          strokeWidth={2.2}
          className={cn(item.destructive ? 'text-red-500' : 'text-text-muted')}
        />
      </View>

      {/* Title */}
      <AppText
        variant="sm"
        className={cn(
          'ml-5 flex-1',
          item.destructive ? 'text-red-500' : 'text-text-secondary',
        )}
      >
        {item.title}
      </AppText>

      {/* Chevron */}
      <AppIcon
        icon={ChevronRight}
        size={25}
        strokeWidth={2.5}
        className={cn(
          item.destructive ? 'text-red-500/60' : 'text-text-muted/60',
        )}
      />
    </AppPressable>
  );
}

export function AccountSettings({
  onItemPress,
  version = 'v1.2.0',
}: AccountSettingsProps) {
  return (
    <View className="flex-1">
      {/* Header */}
      <AppText variant="xl" className=" pb-2 font-semibold text-text">
        Account
      </AppText>

      {/* Settings Card */}
      <View className=" overflow-hidden rounded-[27px] border border-white/10 bg-white/[0.03]">
        {ACCOUNT_ITEMS.map((item, index) => (
          <AccountRow
            key={item.id}
            item={item}
            isLast={index === ACCOUNT_ITEMS.length - 1}
            onPress={() => onItemPress?.(item)}
          />
        ))}
      </View>

      {/* Footer */}
      <View className="mt-4 items-center px-4">
        <AppText variant="sm" className="text-center text-text-muted/60">
          NextChapter {version} • Made with 💜 Naz
        </AppText>
      </View>
    </View>
  );
}
