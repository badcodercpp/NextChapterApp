import { api } from './baseApi';

export const enhancedApi = api.enhanceEndpoints({
  addTagTypes: [
    'Journey',
    'Me',
    'Question',
    'Recovery',
  ],

  endpoints: {
    ActiveJourney: {
      providesTags: ['Journey'],
    },
    Me: {
      providesTags: ['Me'],
    },
    TodayQuestion: {
      providesTags: ['Question'],
    },
    GetRecoveryReason: {
      providesTags: ['Recovery'],
    },
    GetRecoveryTimeline: {
      providesTags: ['Recovery'],
    },
    GetRecoveryFeeling: {
      providesTags: ['Recovery'],
    },
    GetRecoveryGoal: {
      providesTags: ['Recovery'],
    },
    CompleteJourney: {
      invalidatesTags: ['Journey', 'Question'],
    },
    FollowUp: {
      invalidatesTags: ['Question'],
    },
    PauseJourney: {
      invalidatesTags: ['Journey'],
    },
    ResumeJourney: {
      invalidatesTags: ['Journey'],
    },
    StartJourney: {
      invalidatesTags: ['Journey', 'Question'],
    },
    UpdateProfile: {
      invalidatesTags: ['Me'],
    },
  },
});
