import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectLatestAiChatMessage = createSelector(
  api.endpoints.LatestAiChatMessage.select(),
  result => ({
    data: result.data?.latestAiChatMessage,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
