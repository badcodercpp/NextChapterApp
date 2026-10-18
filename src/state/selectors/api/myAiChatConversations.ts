import { api } from '@/__generated__/graphql';
import { createSelector } from '@reduxjs/toolkit';

export const selectMyAiChatConversations = createSelector(
  api.endpoints.MyAiChatConversations.select(),
  result => ({
    data: result.data?.myAiChatConversations,
    loading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }),
);
