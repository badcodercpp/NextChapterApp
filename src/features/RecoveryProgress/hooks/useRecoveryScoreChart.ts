import { endOfDay, formatDate, startOfDay } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { RANGE_OPTIONS } from '@/features/RecoveryProgress/constants';
import { RangeOption } from '../components/RecoveryScoreChartTypes';
import { lazySelectGetRecoveryScoreTrendForLastNDay } from '@/state/selectors';
import { lineDataItem } from 'react-native-gifted-charts';
import { useLazyGetRecoveryScoreTrendForLastNDayQuery } from '@/__generated__/graphql';
import { useResolveClassNames } from 'uniwind';
import { useSelector } from 'react-redux';

export const useRecoveryScoreChart = () => {
  const [isChartDataLoading, setIsChartDataLoading] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<RangeOption>(
    RANGE_OPTIONS[0],
  );

  const [triggerLazyGetRecoveryScoreTrendForLastNDayQuery] =
    useLazyGetRecoveryScoreTrendForLastNDayQuery();

  const [showRangeOptions, setShowRangeOptions] = useState(false);

  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);

  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);

  const [customStartInput, setCustomStartInput] = useState('');

  const [customEndInput, setCustomEndInput] = useState('');

  const { color: chartPrimaryColor } = useResolveClassNames('text-primary');
  const { color: chartMutedColor } = useResolveClassNames('text-text-muted');

  const refetchChartDataFromApi = useCallback(
    async (days: number) => {
      try {
        setIsChartDataLoading(true);
        await triggerLazyGetRecoveryScoreTrendForLastNDayQuery({ days });
      } catch (error) {
        console.log(error);
      } finally {
        setIsChartDataLoading(false);
      }
    },
    [triggerLazyGetRecoveryScoreTrendForLastNDayQuery],
  );

  const selectGetRecoveryScoreTrendForLastNDay = useMemo(() => {
    return lazySelectGetRecoveryScoreTrendForLastNDay(selectedRange.days);
  }, [selectedRange.days]);

  const { data: recoveryScoreTrendForLastNDay } = useSelector(
    selectGetRecoveryScoreTrendForLastNDay,
  );

  /**
   * Select range
   */
  const handleRangeSelect = (option: RangeOption) => {
    if (option.days === null) {
      setShowRangeOptions(false);
      setShowCustomPicker(true);
      return;
    }

    setSelectedRange(option);
    setShowRangeOptions(false);
  };

  /**
   * Custom date parser
   *
   * Expected:
   * DD/MM/YYYY
   */
  const parseDate = (value: string): Date | null => {
    const parts = value.split('/');

    if (parts.length !== 3) {
      return null;
    }

    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);

    if (
      !day ||
      !month ||
      !year ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return null;
    }

    const date = new Date(year, month - 1, day);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  /**
   * Apply custom range
   */
  const handleApplyCustomRange = () => {
    const start = parseDate(customStartInput);
    const end = parseDate(customEndInput);

    if (!start || !end) {
      return;
    }

    if (start > end) {
      return;
    }

    setCustomStartDate(startOfDay(start));
    setCustomEndDate(endOfDay(end));

    setShowCustomPicker(false);
  };

  /**
   * Filter API data
   */
  const filteredData = useMemo(() => {
    if (!recoveryScoreTrendForLastNDay.length) {
      return [];
    }

    /**
     * Custom range
     */
    if (selectedRange.days === null && customStartDate && customEndDate) {
      return recoveryScoreTrendForLastNDay.filter(item => {
        if (!item.createdAt) {
          return false;
        }

        const itemDate = new Date(item.createdAt?.toString());

        return itemDate >= customStartDate && itemDate <= customEndDate;
      });
    }

    /**
     * Fixed range
     */
    if (selectedRange.days !== null) {
      return recoveryScoreTrendForLastNDay.slice(-selectedRange.days);
    }

    return recoveryScoreTrendForLastNDay;
  }, [
    recoveryScoreTrendForLastNDay,
    selectedRange.days,
    customStartDate,
    customEndDate,
  ]);

  /**
   * Gifted Charts data
   */
  const chartData: Array<lineDataItem> = useMemo(() => {
    return filteredData.map(item => ({
      value: Math.max(0, Math.min(100, item.score ?? 0)),
      label: formatDate(item.createdAt?.toString() ?? null),
      labelTextStyle: {
        color: chartMutedColor?.toString(),
        fontSize: 16,
        width: 80,
        textAlign: 'center',
      },

      hideDataPoint: false,
      dataPointColor: chartPrimaryColor?.toString(),
      dataPointRadius: 6,
    }));
  }, [chartMutedColor, chartPrimaryColor, filteredData]);

  const latestScore =
    chartData.length > 0 ? chartData[chartData.length - 1].value : null;

  useEffect(() => {
    refetchChartDataFromApi(selectedRange.days);
  }, [refetchChartDataFromApi, selectedRange.days]);

  return {
    selectedRange,
    setSelectedRange,
    showRangeOptions,
    setShowRangeOptions,
    showCustomPicker,
    setShowCustomPicker,
    customStartInput,
    setCustomStartInput,
    customEndInput,
    setCustomEndInput,
    handleRangeSelect,
    parseDate,
    handleApplyCustomRange,
    latestScore,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    chartData,
    isChartDataLoading,
  };
};
