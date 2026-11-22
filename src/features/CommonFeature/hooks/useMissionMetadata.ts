import { MissionStatus } from '@/__generated__/graphql';
import { selectTodayMission } from '@/state/selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useMissionMetadata = () => {
  const { data: todayMission } = useSelector(selectTodayMission);
  const isMissionStarted = todayMission?.status === MissionStatus.Started;
  const isMissionCompleted = todayMission?.status === MissionStatus.Completed;

  const getMissionProgress = useCallback(() => {
    const total = 1;
    const completed = isMissionCompleted ? 1 : 0;
    const started = isMissionStarted && !isMissionCompleted ? 1 : 0;

    const progress = isMissionCompleted ? 1 : isMissionStarted ? 0.5 : 0;

    return {
      total,
      completed,
      started,
      progress,
    };
  }, [isMissionCompleted, isMissionStarted]);

  return {
    isMissionStarted,
    isMissionCompleted,
    getMissionProgress,
  };
};
