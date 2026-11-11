import { AppIcon, AppPressable, AppText } from '@/components';
import { ChevronRight, LogOut, UserRound } from 'lucide-react-native';

import { View } from 'react-native';
import { cn } from '@/utils';

export interface AccountSettingItem {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof UserRound;
  destructive?: boolean;
}

interface AccountSettingsProps {
  onItemPress?: (item: AccountSettingItem) => void;
  version?: string;
}

const ACCOUNT_ITEMS: AccountSettingItem[] = [
  {
    id: 'sign-out',
    title: 'Sign Out',
    subtitle: 'Log out of your account',
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
        !isLast && 'border-b border-border',
        item.destructive &&
          'my-2 rounded-[20px] border border-red-500/25 bg-transparent px-4 py-4',
      )}
    >
      {/* Icon */}
      <View
        className={cn(
          'h-10 w-10 items-center justify-center rounded-full',
          item.destructive ? 'bg-red-500/10' : 'bg-primary/15',
        )}
      >
        <AppIcon
          icon={item.icon}
          size={item.destructive ? 26 : 24}
          strokeWidth={2.2}
          className={cn(item.destructive ? 'text-red-500' : 'text-text-muted')}
        />
      </View>

      {/* Title */}
      <View className="ml-3 flex-1">
        <AppText
          variant="md"
          className={cn(
            'font-semibold',
            item.destructive ? 'text-red-500' : 'text-text',
          )}
        >
          {item.title}
        </AppText>
        <AppText
          variant="sm"
          className={cn(
            'mt-0.5',
            item.destructive ? 'text-text-muted' : 'text-text-secondary',
          )}
          numberOfLines={1}
        >
          {item.subtitle}
        </AppText>
      </View>

      {/* Chevron */}
      <AppIcon
        icon={ChevronRight}
        size={22}
        strokeWidth={2.5}
        className={cn(
          item.destructive ? 'text-red-500' : 'text-text-muted',
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
      {/* Settings Card */}
      <View className="overflow-hidden rounded-[24px] bg-transparent">
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
