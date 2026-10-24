import { AppCard, AppInput, AppText } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';

import { AnswerInputCard } from '@/features/CommonFeature';
import { MasterFormData } from '@/form/types';

interface CreateJournalFormProps {}

export function CreateJournalForm({}: CreateJournalFormProps) {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();
  return (
    <AppCard className="rounded-3xl border border-border bg-card p-4">
      <AppText variant="sm" className="mb-1 px-2 text-text">
        Title
      </AppText>
      <Controller
        control={control}
        name="createOrUpdateJournal.title"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
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
      <AppText variant="sm" className="mt-4 mb-1 px-2 text-text">
        Content
      </AppText>
      <Controller
        control={control}
        name="createOrUpdateJournal.content"
        render={({ field: { onChange, onBlur, value } }) => (
          <AnswerInputCard
            placeholder="Type your feelings here..."
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            inputClassName="px-0"
            error={errors?.createOrUpdateJournal?.content?.message}
            containerClassName="px-4"
            onFocus={() => {
              clearErrors('createOrUpdateJournal.content');
            }}
          />
        )}
      />
    </AppCard>
  );
}
