import { AppCard, AppIcon, AppInput, AppText } from '@/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { PencilLine, Tag } from 'lucide-react-native';
import { View } from 'react-native';

import { JournalAnswerInputCard } from '@/features/CommonFeature';
import { MasterFormData } from '@/form/types';

interface CreateJournalFormProps {}

export function CreateJournalForm({}: CreateJournalFormProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();
  const content = useWatch({ control, name: 'createOrUpdateJournal.content' });
  return (
    <AppCard className="overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-primary-v2/15"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-36 -left-16 h-56 w-64 rounded-full bg-primary-v2/10"
      />
      <View className="mb-2 flex-row items-center">
        <AppIcon icon={Tag} size={20} className="mr-2 text-link-v2" />
        <AppText variant="md" className="font-semibold text-text-v2">
          Title
        </AppText>
      </View>
      <Controller
        control={control}
        name="createOrUpdateJournal.title"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            variant="v2"
            containerClassName="rounded-[18px] border-primary-v2/30 bg-background-v2/60"
            inputClassName="text-text-v2 leading-5"
            placeholder="Enter Journal title"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors?.createOrUpdateJournal?.title?.message}
            onFocus={() => {
              clearErrors('createOrUpdateJournal.title');
            }}
          />
        )}
      />
      <View className="mb-2 mt-5 flex-row items-center">
        <AppIcon icon={PencilLine} size={20} className="mr-2 text-link-v2" />
        <AppText variant="md" className="font-semibold text-text-v2">
          Content
        </AppText>
      </View>
      <JournalAnswerInputCard
        variant="v2"
        containerClassName="rounded-[18px] border-primary-v2/30 bg-background-v2/60"
        inputClassName="min-h-[160px] text-text-v2 leading-6"
      />
      <AppText variant="xs" className="mt-2 text-right text-text-muted-v2">
        {content?.length ?? 0} characters
      </AppText>
    </AppCard>
  );
}
