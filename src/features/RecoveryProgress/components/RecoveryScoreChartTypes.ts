import { GetRecoveryScoreTrendForLastNDayQuery } from '@/__generated__/graphql';
import { RANGE_OPTIONS } from '../constants';

export type RecoveryScoreTrendItem =
  GetRecoveryScoreTrendForLastNDayQuery['getRecoveryScoreTrendForLastNDay'][number];

export type RangeOption = (typeof RANGE_OPTIONS)[number];
