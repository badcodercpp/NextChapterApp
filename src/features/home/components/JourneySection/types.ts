export interface Journey {
  currentDay: number;
  totalDays: number;

  phase: string;

  recoveryScore: number;

  scoreChange: number;

  completedDays: number;

  remainingDays: number;
}
