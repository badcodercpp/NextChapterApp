import type { HelpTopicId } from '../data/helpTopics';

export type HelpStackParamList = {
  HelpScreen: undefined;
  HelpTopic: { topicId: HelpTopicId };
};
