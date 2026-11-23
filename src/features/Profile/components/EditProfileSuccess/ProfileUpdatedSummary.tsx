import { AppCard, AppIcon, AppText } from '@/components';
import { Check, UserRound } from 'lucide-react-native';
import { cn, getUserUpdatedFieldIcon } from '@/utils';

import { View } from 'react-native';
import { selectUpdateProfileUpdatedFields } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface UpdatedItem {
  id: string;
  label: string;
  icon: typeof UserRound;
}

interface ProfileUpdatedSummaryProps {
  items?: UpdatedItem[];
  className?: string;
}

export function ProfileUpdatedSummary({
  className,
}: ProfileUpdatedSummaryProps) {
  const updateProfileUpdatedFields =
    useSelector(selectUpdateProfileUpdatedFields) ?? [];

  return (
    <AppCard
      decorated
      className={cn(
        'w-full overflow-hidden rounded-[24px]',
        'border border-primary-v2/25',
        'bg-surface-v2/70',
        'p-4',
        className,
      )}
    >
      {/* Header */}
      <AppText
        variant="md"
        className="
          mb-4
          font-semibold
          uppercase
          text-text-muted-v2
        "
      >
        What Was Updated
      </AppText>

      {/* Updated Items */}
      <View>
        {updateProfileUpdatedFields.map((item, index) => {
          const UpdatedItemIcon = getUserUpdatedFieldIcon(item);
          return (
            <View
              key={`${item}_${index}`}
              className={cn(
                'flex-row items-center',
                index !== updateProfileUpdatedFields?.length - 1 && 'mb-3',
              )}
            >
              {/* Icon */}
              <View
                className="
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-primary-v2/30
                bg-primary-v2/[0.05]
              "
              >
                <AppIcon
                  icon={UpdatedItemIcon}
                  size={20}
                  className="text-link-v2"
                  strokeWidth={2.3}
                />
              </View>

              {/* Label */}
              <AppText
                variant="sm"
                className="
                ml-4
                flex-1
                text-text-muted-v2
              "
                numberOfLines={1}
              >
                {item}
              </AppText>

              {/* Success */}
              <View
                className="
                ml-4
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-primary-v2/15
              "
              >
                <AppIcon
                  icon={Check}
                  size={20}
                  className="text-link-v2"
                  strokeWidth={3}
                />
              </View>
            </View>
          );
        })}
      </View>
    </AppCard>
  );
}
