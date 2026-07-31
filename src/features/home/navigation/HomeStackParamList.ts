import { HomeRoutes } from './HomeRoutes';

export type HomeStackParamList = {
  [HomeRoutes.Home]: undefined;

  [HomeRoutes.Reflection]: {
    reflectionId: string;
  };

  [HomeRoutes.Insight]: {
    insightId: string;
  };

  [HomeRoutes.Challenge]: {
    challengeId: string;
  };

  [HomeRoutes.MoodHistory]: undefined;
};
