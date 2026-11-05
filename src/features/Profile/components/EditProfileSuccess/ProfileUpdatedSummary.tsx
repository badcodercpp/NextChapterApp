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

  console.log('updateProfileUpdatedFields', updateProfileUpdatedFields);

  return (
    <AppCard
      className={cn(
        'w-full rounded-[24]',
        'border border-white/10',
        'bg-white/[0.05]',
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
          text-text-muted
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
                index !== updateProfileUpdatedFields?.length - 1 && 'mb-4',
              )}
            >
              {/* Icon */}
              <View
                className="
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-teal-400/30
                bg-teal-400/[0.05]
              "
              >
                <AppIcon
                  icon={UpdatedItemIcon}
                  size={16}
                  className="text-teal-400"
                  strokeWidth={2.3}
                />
              </View>

              {/* Label */}
              <AppText
                variant="sm"
                className="
                ml-4
                flex-1
                text-text-secondary
              "
                numberOfLines={1}
              >
                {item}
              </AppText>

              {/* Success */}
              <View
                className="
                ml-4
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-teal-400/15
              "
              >
                <AppIcon
                  icon={Check}
                  size={16}
                  className="text-teal-400"
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
