import { AppIcon, AppPressable, AppText } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { Modal, Pressable, ScrollView, View } from 'react-native';

import { Calendar, ChevronDown } from 'lucide-react-native';
import { Calendar as DateCalendar, DateData } from 'react-native-calendars';
import { format, isValid, parseISO } from 'date-fns';
import { Gender } from '@/__generated__/graphql';
import { MasterFormData } from '@/form/types';
import { useState } from 'react';
import { cn } from '@/utils';

interface PersonalDetailsSectionProps {}

const GENDER_OPTIONS: {
  value: Gender;
  label: string;
}[] = [
  {
    value: Gender.Female,
    label: 'Female',
  },
  {
    value: Gender.Male,
    label: 'Male',
  },
  {
    value: Gender.Other,
    label: 'Other',
  },
];

const MINIMUM_BIRTH_YEAR = 1965;

const getDateFromValue = (value?: string | null): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const parsedDate = parseISO(value);
  return isValid(parsedDate) ? parsedDate : undefined;
};

export function PersonalDetailsSection({}: PersonalDetailsSectionProps) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [choosingYear, setChoosingYear] = useState(false);
  const [calendarDate, setCalendarDate] = useState<string>();
  const today = new Date();
  const currentYear = today.getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - MINIMUM_BIRTH_YEAR + 1 },
    (_, index) => currentYear - index,
  );

  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext<MasterFormData>();

  return (
    <View className="w-full">
      {/* Section Header */}
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 h-9 w-1.5 rounded-full bg-primary" />

        <AppText
          variant="md"
          className="font-semibold uppercase tracking-[2.5px] text-text-muted"
        >
          Personal Details
        </AppText>
      </View>

      {/* Gender */}
      <View className="mb-6">
        <AppText variant="md" className="mb-2 px-2 text-text">
          Gender
        </AppText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-none"
          contentContainerClassName="flex-row gap-3"
        >
          <Controller
            control={control}
            name="updateProfile.gender"
            render={({ field: { value, onChange } }) => (
              <>
                {GENDER_OPTIONS.map(option => {
                  const isSelected = option.value === value;

                  return (
                    <AppPressable
                      key={option.value}
                      onPress={() => onChange(option.value)}
                      className={cn(
                        'min-w-[104px] px-5 py-3 items-center justify-center rounded-[18px]',
                        'border',
                        isSelected
                          ? 'border-primary bg-primary/15'
                          : 'border-white/10 bg-white/[0.06]',
                      )}
                      accessibilityRole="button"
                      accessibilityState={{
                        selected: isSelected,
                      }}
                    >
                      <AppText
                        variant="md"
                        className={cn(
                          'font-semibold',
                          isSelected ? 'text-primary' : 'text-text-muted',
                        )}
                      >
                        {option.label}
                      </AppText>
                    </AppPressable>
                  );
                })}
              </>
            )}
          />
        </ScrollView>
      </View>

      {/* Date of Birth */}
      <AppText variant="md" className="mb-2 px-2 text-text">
        Date of Birth
      </AppText>

      <Controller
        control={control}
        name="updateProfile.dob"
        render={({ field: { onChange, onBlur, value } }) => {
          const selectedDate = getDateFromValue(value);
          const initialDate =
            getDateFromValue(calendarDate) ?? selectedDate ?? today;
          const calendarMonth = format(initialDate, 'yyyy-MM-dd');

          return (
            <>
              <AppPressable
                onPress={() => {
                  clearErrors('updateProfile.dob');
                  setChoosingYear(false);
                  setCalendarDate(
                    format(selectedDate ?? today, 'yyyy-MM-dd'),
                  );
                  setDatePickerVisible(true);
                }}
                accessibilityRole="button"
                accessibilityLabel="Choose date of birth"
                className="min-h-[64px] flex-row items-center rounded-[24px] border border-border bg-card/60 px-4"
              >
                <AppIcon
                  icon={Calendar}
                  size={22}
                  className="mr-3 text-text-secondary"
                />
                <AppText
                  variant="md"
                  className={
                    selectedDate ? 'flex-1 text-text' : 'flex-1 text-text-muted'
                  }
                >
                  {selectedDate
                    ? format(selectedDate, 'MMM d, yyyy')
                    : 'Enter your date of birth'}
                </AppText>
                <AppIcon
                  icon={ChevronDown}
                  size={20}
                  className="text-text-muted"
                />
              </AppPressable>

              {errors?.updateProfile?.dob?.message && (
                <AppText variant="xs" className="ml-2 mt-1 text-error">
                  {errors.updateProfile.dob.message}
                </AppText>
              )}

              <Modal
                visible={datePickerVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setDatePickerVisible(false)}
              >
                <View className="flex-1 items-center justify-center bg-black/70 px-5">
                  <Pressable
                    className="absolute inset-0"
                    onPress={() => setDatePickerVisible(false)}
                    accessibilityRole="button"
                    accessibilityLabel="Close date picker"
                  />
                  <View className="w-full max-w-[420px] overflow-hidden rounded-[24px] border border-secondary/40 bg-background p-4">
                    <View className="mb-3 flex-row items-center justify-between">
                      <AppText variant="lg" className="font-semibold text-text">
                        Date of Birth
                      </AppText>
                      <AppPressable
                        onPress={() => setChoosingYear(current => !current)}
                        accessibilityRole="button"
                        accessibilityLabel="Select birth year"
                        className="flex-row items-center rounded-full border border-secondary/30 bg-primary/10 px-3 py-2"
                      >
                        <AppText variant="sm" className="font-semibold text-secondary">
                          {selectedDate?.getFullYear() ??
                            initialDate.getFullYear()}
                        </AppText>
                        <AppIcon
                          icon={ChevronDown}
                          size={16}
                          className="ml-1 text-secondary"
                        />
                      </AppPressable>
                    </View>

                    {choosingYear ? (
                      <ScrollView
                        className="h-[300px]"
                        contentContainerClassName="flex-row flex-wrap justify-between"
                        showsVerticalScrollIndicator
                      >
                        {yearOptions.map(year => {
                          const isSelected =
                            year ===
                            (selectedDate?.getFullYear() ??
                              initialDate.getFullYear());

                          return (
                            <AppPressable
                              key={year}
                              onPress={() => {
                                const month = initialDate.getMonth();
                                const day = initialDate.getDate();
                                const adjustedDay = Math.min(
                                  day,
                                  new Date(year, month + 1, 0).getDate(),
                                );
                                const nextDate = new Date(
                                  year,
                                  month,
                                  adjustedDay,
                                );
                                const nextDateString = format(
                                  nextDate,
                                  'yyyy-MM-dd',
                                );

                                setCalendarDate(nextDateString);
                                setChoosingYear(false);
                              }}
                              className={cn(
                                'mb-2 w-[23%] items-center justify-center rounded-xl border py-3',
                                isSelected
                                  ? 'border-secondary bg-primary/20'
                                  : 'border-border bg-card',
                              )}
                            >
                              <AppText
                                variant="sm"
                                className={
                                  isSelected
                                    ? 'font-semibold text-secondary'
                                    : 'text-text'
                                }
                              >
                                {year}
                              </AppText>
                            </AppPressable>
                          );
                        })}
                      </ScrollView>
                    ) : (
                      <DateCalendar
                        key={format(initialDate, 'yyyy-MM')}
                        current={calendarMonth}
                        minDate={`${MINIMUM_BIRTH_YEAR}-01-01`}
                        maxDate={format(today, 'yyyy-MM-dd')}
                        hideExtraDays
                        enableSwipeMonths
                        onMonthChange={month =>
                          setCalendarDate(month.dateString)
                        }
                        onDayPress={(day: DateData) => {
                          onChange(day.dateString);
                          setCalendarDate(day.dateString);
                          onBlur();
                          setDatePickerVisible(false);
                        }}
                        markedDates={
                          selectedDate
                            ? {
                                [format(selectedDate, 'yyyy-MM-dd')]: {
                                  selected: true,
                                  selectedColor: '#7C3AED',
                                  selectedTextColor: '#FFFFFF',
                                },
                              }
                            : undefined
                        }
                        theme={{
                          calendarBackground: '#221D42',
                          backgroundColor: '#221D42',
                          textSectionTitleColor: '#A39CBF',
                          monthTextColor: '#FFFFFF',
                          dayTextColor: '#FFFFFF',
                          textDisabledColor: '#625D78',
                          todayTextColor: '#C084FC',
                          arrowColor: '#C084FC',
                          selectedDayBackgroundColor: '#7C3AED',
                          selectedDayTextColor: '#FFFFFF',
                          textMonthFontWeight: '700',
                          textDayFontWeight: '500',
                        }}
                      />
                    )}

                    <AppPressable
                      onPress={() => setDatePickerVisible(false)}
                      className="mt-3 items-center rounded-2xl border border-border py-3"
                    >
                      <AppText
                        variant="sm"
                        className="font-semibold text-text-secondary"
                      >
                        Cancel
                      </AppText>
                    </AppPressable>
                  </View>
                </View>
              </Modal>
            </>
          );
        }}
      />
    </View>
  );
}
