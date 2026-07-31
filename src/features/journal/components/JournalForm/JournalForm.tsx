import { Controller, useForm } from 'react-hook-form';
import {
  JournalFormValues,
  journalSchema,
} from '../../validation/journal.schema';
import React, { useMemo } from 'react';

import { AppInput } from '@/components/foundation/AppInput';
import { AppText } from '@/components/foundation/AppText';
import { CategorySelector } from '../CategorySelector/CategorySelector';
import { CreateJournalScreenConfig } from './config';
import { JournalFormProps } from './types';
import { JournalHeader } from '../../components/JournalHeader';
import { JournalTextField } from '../../components/JournalTitleInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MoodSelector } from '../../components/MoodSelector';
import { View } from 'react-native';
import { defaultJournalValues } from '../../validation/defaultValues';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';

export const JournalForm = ({ mode = 'create', journal }: JournalFormProps) => {
  const navigation = useNavigation();
  const defaultValues = useMemo<JournalFormValues>(() => {
    if (!journal) {
      return defaultJournalValues;
    }

    return {
      mood: journal.mood,
      category: journal.category,
      title: journal.title,
      content: journal.content,
    };
  }, [journal]);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (_values: JournalFormValues) => {
    if (mode === 'create') {
      // await createJournal(values);
    } else {
      // await updateJournal(journal!.id, values);
    }

    // navigation.goBack();
  };

  return (
    <View>
      <JournalHeader
        title="New Journal"
        onClose={() => navigation.goBack()}
        onSave={handleSubmit(onSubmit)}
        saveDisabled={!isDirty || !isValid}
        saveLoading={isSubmitting}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Controller
          control={control}
          name="mood"
          render={({ field }) => (
            <MoodSelector value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <CategorySelector
              value={field.value}
              onChange={field.onChange}
              hideAll
            />
          )}
        />

        <View>
          <View style={styles.titleContainer}>
            <AppText variant="bodyBold">Title</AppText>
          </View>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <AppInput
                placeholder="Give your journal a title..."
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                maxLength={CreateJournalScreenConfig.titleMaxLength}
              />
            )}
          />
        </View>

        <View>
          <View style={styles.journaltitleContainer}>
            <AppText variant="bodyBold">Write your thoughts...</AppText>
          </View>
          <Controller
            control={control}
            name="content"
            render={({ field, fieldState }) => (
              <JournalTextField
                placeholder="Describe your day..."
                multiline
                numberOfLines={8}
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                maxLength={CreateJournalScreenConfig.contentMaxLength}
              />
            )}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
