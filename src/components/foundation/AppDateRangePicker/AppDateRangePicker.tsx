import { Calendar, DateData } from 'react-native-calendars';
import React, { useMemo, useState } from 'react';

import { AppDateRangePickerProps } from './types';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import { MarkedDates } from 'react-native-calendars/src/types';
import { View } from 'react-native';

const getDateValue = (date: string) => {
  return new Date(`${date}T00:00:00`).getTime();
};

export function AppDateRangePicker({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onChange,
  minDate,
  maxDate,
}: AppDateRangePickerProps) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const markedDates = useMemo<MarkedDates>(() => {
    if (!startDate) {
      return {};
    }

    // Only start date selected
    if (!endDate) {
      return {
        [startDate]: {
          startingDay: true,
          endingDay: true,
          color: '#7C3AED',
          textColor: '#FFFFFF',
        },
      };
    }

    const marks: MarkedDates = {};

    const current = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    while (current <= end) {
      const dateString = current.toISOString().split('T')[0];

      marks[dateString] = {
        color: '#EDE9FE',
        textColor: '#111827',
      };

      current.setDate(current.getDate() + 1);
    }

    marks[startDate] = {
      startingDay: true,
      color: '#7C3AED',
      textColor: '#FFFFFF',
    };

    marks[endDate] = {
      endingDay: true,
      color: '#7C3AED',
      textColor: '#FFFFFF',
    };

    return marks;
  }, [startDate, endDate]);

  const handleDayPress = (day: DateData) => {
    const selectedDate = day.dateString;

    // Start a new selection
    if (!startDate || endDate) {
      setStartDate(selectedDate);
      setEndDate(undefined);

      onChange?.(selectedDate, undefined);
      return;
    }

    // User selected a date before the start date
    if (getDateValue(selectedDate) < getDateValue(startDate)) {
      setStartDate(selectedDate);
      setEndDate(startDate);

      onChange?.(selectedDate, startDate);
      return;
    }

    // Complete the range
    setEndDate(selectedDate);
    onChange?.(startDate, selectedDate);
  };

  const clear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onChange?.(undefined, undefined);
  };

  return (
    <View className="overflow-hidden rounded-2xl bg-white">
      <View className="flex-row items-center justify-between px-4 py-4">
        <View>
          <AppText variant="xs" className="mb-1 font-medium text-gray-500">
            {endDate ? 'Selected range' : 'Select end date'}
          </AppText>

          <AppText className="font-semibold text-gray-900">
            {startDate ?? 'Select start date'}
            {endDate ? `  →  ${endDate}` : ''}
          </AppText>
        </View>

        {(startDate || endDate) && (
          <AppPressable onPress={clear}>
            <AppText className="font-medium text-purple-600">Clear</AppText>
          </AppPressable>
        )}
      </View>

      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={handleDayPress}
        minDate={minDate}
        maxDate={maxDate}
        enableSwipeMonths
        hideExtraDays
        theme={{
          todayTextColor: '#7C3AED',
          arrowColor: '#7C3AED',
          monthTextColor: '#111827',
          textMonthFontWeight: '700',
          textDayFontWeight: '500',
          textDisabledColor: '#D1D5DB',
        }}
      />
    </View>
  );
}
