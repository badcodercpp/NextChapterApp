import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  TrendingUp,
  X,
} from 'lucide-react-native';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { RANGE_OPTIONS } from '../constants';
import React from 'react';
import { RecoveryScoreChartComponent } from './RecoveryScoreChartComponent';
import { formatLongDate } from '@/utils';
import { useRecoveryScoreChart } from '../hooks/useRecoveryScoreChart';

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
    isChartDataLoading,
    isError,
    scoreChange,
  } = useRecoveryScoreChart();

  return (
    <>
      <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/40 bg-background-v2 p-4">
        <View
          pointerEvents="none"
          className="absolute inset-0 bg-primary-v2/10"
        />
        <View
          pointerEvents="none"
          className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary-v2/10"
        />
        {/* Header */}
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-[14px] bg-primary-v2/25">
            <AppIcon icon={TrendingUp} size={25} className="text-link-v2" />
          </View>
          <View className="flex-1">
            <AppText variant="md" className="font-bold text-text-v2">
              Recovery Score Over Time
            </AppText>
            <AppText variant="xs" className="mt-1 text-text-muted-v2">
              Your healing and resilience progress.
            </AppText>
          </View>
        </View>

        {/* Range Selector */}
        <View className="mt-4 flex-row flex-wrap items-center justify-between gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Select chart time range"
            onPress={() => setShowRangeOptions(previous => !previous)}
            className="h-10 flex-row items-center justify-center rounded-full border border-primary-v2/50 bg-primary-v2/15 px-4"
          >
            <AppText variant="sm" className="font-semibold text-link-v2">
              {selectedRange.label}
            </AppText>

            <AppIcon
              icon={ChevronDown}
              size={18}
              className="ml-2 text-link-v2"
              strokeWidth={2.5}
            />
          </Pressable>

          {!isChartDataLoading && !isError && scoreChange !== null && (
            <View className="flex-row items-center rounded-[18px] border border-primary-v2/30 bg-background-v2/40 px-3 py-2">
              <AppIcon
                icon={scoreChange < 0 ? ArrowDownRight : ArrowUpRight}
                size={22}
                className={scoreChange < 0 ? 'text-link-v2' : 'text-success'}
              />
              <View className="ml-1.5">
                <AppText
                  variant="md"
                  className={
                    scoreChange < 0
                      ? 'font-bold text-link-v2'
                      : 'font-bold text-success'
                  }
                >
                  {scoreChange > 0 ? '+' : ''}
                  {scoreChange} pts
                </AppText>
                <AppText variant="xs" className="text-text-muted-v2">
                  in this period
                </AppText>
              </View>
            </View>
          )}
        </View>

        {/* Custom range summary */}
        {selectedRange.days === null && customStartDate && customEndDate && (
          <AppText variant="xs" className="mt-2 text-text-muted-v2">
            {formatLongDate(customStartDate)}
            {' - '}
            {formatLongDate(customEndDate)}
          </AppText>
        )}

        {/* Chart */}
        {isChartDataLoading ? (
          <View className="h-56 items-center justify-center">
            <ActivityIndicator />
            <AppText variant="sm" className="mt-3 text-text-muted-v2">
              Loading recovery scores...
            </AppText>
          </View>
        ) : isError ? (
          <View className="h-56 items-center justify-center">
            <AppText variant="sm" className="text-error">
              Unable to load recovery scores. Select a range to retry.
            </AppText>
          </View>
        ) : chartData.length > 0 ? (
          <>
            <RecoveryScoreChartComponent
              data={chartData}
              latestScore={latestScore}
              selectedRange={selectedRange}
            />
          </>
        ) : (
          <View className="items-center justify-center py-12">
            <AppText variant="md" className="text-text-muted-v2">
              Your recovery progress will appear here.
            </AppText>
          </View>
        )}
      </AppCard>
      <Modal
        visible={showRangeOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRangeOptions(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <Pressable
            accessibilityLabel="Close time range picker"
            className="absolute inset-0"
            onPress={() => setShowRangeOptions(false)}
          />
          <View className="w-full max-w-[380px] max-h-[75%] rounded-[28px] border border-primary-v2/40 bg-background-v2 p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <AppText variant="lg" className="font-bold text-text-v2">
                Time range
              </AppText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close time range picker"
                onPress={() => setShowRangeOptions(false)}
                className="h-9 w-9 items-center justify-center rounded-full bg-primary-v2/15"
              >
                <AppIcon icon={X} size={20} className="text-link-v2" />
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {RANGE_OPTIONS.map(option => (
                <Pressable
                  key={option.label}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: selectedRange.days === option.days,
                  }}
                  onPress={() => handleRangeSelect(option)}
                  className={`mb-2 flex-row items-center justify-between rounded-[16px] px-4 py-3 ${
                    selectedRange.days === option.days
                      ? 'bg-primary-v2/20'
                      : 'bg-surface-v2/40'
                  }`}
                >
                  <AppText
                    variant="md"
                    className={
                      selectedRange.days === option.days
                        ? 'font-semibold text-link-v2'
                        : 'text-text-v2'
                    }
                  >
                    {option.label}
                  </AppText>
                  {selectedRange.days === option.days && (
                    <AppIcon icon={Check} size={20} className="text-link-v2" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
