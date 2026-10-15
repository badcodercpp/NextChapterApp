import { AppCard, AppPressable, AppText } from '@/components';
import { ChevronDown, X } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';

import { RANGE_OPTIONS } from '../constants';
import React from 'react';
import { RecoveryScoreChartComponent } from './RecoveryScoreChartComponent';
import { formatLongDate } from '@/utils';
import { useRecoveryScoreChart } from '../hooks/useRecoveryScoreChart';

const PURPLE = '#B84CFF';

export interface RecoveryScoreChartProps {
  title?: string;
}

export function RecoveryScoreChart({}: RecoveryScoreChartProps) {
  const {
    selectedRange,
    // setSelectedRange,
    showRangeOptions,
    setShowRangeOptions,
    showCustomPicker,
    setShowCustomPicker,
    customStartInput,
    // setCustomStartInput,
    customEndInput,
    // setCustomEndInput,
    handleRangeSelect,
    // parseDate,
    handleApplyCustomRange,
    latestScore,
    customStartDate,
    // setCustomStartDate,
    customEndDate,
    // setCustomEndDate,
    chartData,
  } = useRecoveryScoreChart();

  return (
    <>
      <AppCard className="rounded-[24px] border border-border bg-card p-5">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <AppText variant="lg" className="flex-1 font-semibold text-white">
            Recovery Score Over Time
          </AppText>

          {/* Range Selector */}
          <View className="relative ml-3">
            <Pressable
              onPress={() => setShowRangeOptions(previous => !previous)}
              className="h-11 flex-row items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4"
            >
              <AppText variant="sm" className="font-semibold text-purple-400">
                {selectedRange.label}
              </AppText>

              <ChevronDown size={17} color={PURPLE} strokeWidth={2.5} />
            </Pressable>

            {showRangeOptions && (
              <View className="absolute right-0 top-12 z-50 min-w-[150px] overflow-hidden rounded-2xl border border-white/10 bg-[#263B5D]">
                {RANGE_OPTIONS.map(option => (
                  <Pressable
                    key={option.label}
                    onPress={() => handleRangeSelect(option)}
                    className="px-4 py-3"
                  >
                    <AppText
                      variant="sm"
                      className={
                        selectedRange.label === option.label
                          ? 'font-semibold text-purple-400'
                          : 'text-white'
                      }
                    >
                      {option.label}
                    </AppText>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Custom range summary */}
        {selectedRange.days === null && customStartDate && customEndDate && (
          <AppText variant="xs" className="mt-2 text-slate-400">
            {formatLongDate(customStartDate)}
            {' - '}
            {formatLongDate(customEndDate)}
          </AppText>
        )}

        {/* Chart */}
        {chartData.length > 0 ? (
          <>
            <RecoveryScoreChartComponent
              data={chartData}
              latestScore={latestScore}
              selectedRange={selectedRange}
            />
          </>
        ) : (
          <View className="items-center justify-center py-12">
            <AppText variant="md" className="text-slate-300">
              Your recovery progress will appear here.
            </AppText>
          </View>
        )}
      </AppCard>

      {/* Custom Date Range Modal */}
      <Modal
        visible={showCustomPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomPicker(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <Pressable
            className="absolute inset-0"
            onPress={() => setShowCustomPicker(false)}
          />

          <View className="w-full max-w-[380px] rounded-[28px] bg-[#1E3355] p-6">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between">
              <AppText variant="xl" className="font-semibold text-white">
                Custom Range
              </AppText>

              <Pressable
                onPress={() => setShowCustomPicker(false)}
                className="h-9 w-9 items-center justify-center rounded-full bg-white/5"
              >
                <X size={18} color="#94A3B8" />
              </Pressable>
            </View>

            <AppText variant="sm" className="mt-2 text-slate-400">
              Enter the date range you want to view.
            </AppText>

            {/* Start Date */}
            <View className="mt-6">
              <AppText variant="sm" className="mb-2 font-medium text-white">
                Start Date
              </AppText>

              <AppPressable className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <AppText variant="md" className="text-slate-300">
                  {customStartInput || 'DD/MM/YYYY'}
                </AppText>
              </AppPressable>
            </View>

            {/* End Date */}
            <View className="mt-4">
              <AppText variant="sm" className="mb-2 font-medium text-white">
                End Date
              </AppText>

              <AppPressable className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <AppText variant="md" className="text-slate-300">
                  {customEndInput || 'DD/MM/YYYY'}
                </AppText>
              </AppPressable>
            </View>

            {/* Apply */}
            <AppPressable
              onPress={handleApplyCustomRange}
              className="mt-6 items-center justify-center rounded-2xl bg-primary px-4 py-4"
            >
              <AppText variant="md" className="font-semibold text-white">
                Apply Range
              </AppText>
            </AppPressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
