import { ConversationRole, TodayQuestionQuery } from '@/__generated__/graphql';

export function getLastConversationByRole(
  todaysQuestion?: TodayQuestionQuery['todayQuestion'],
  role?: ConversationRole,
) {
  return [...(todaysQuestion?.conversation || [])]
    .reverse()
    .find(message => message.role === role);
}
