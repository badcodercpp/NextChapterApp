export enum UserMood {
  Happy = 'happy',
  Calm = 'calm',
  Neutral = 'neutral',
  Sad = 'sad',
  Anxious = 'anxious',
  Angry = 'angry',
  Grateful = 'grateful',
  Hopeful = 'hopeful',
  Lonely = 'lonely',
  Confident = 'confident',
  Heartbroken = 'heartbroken',
}

export const UserMoodConfig = {
  [UserMood.Happy]: {
    label: 'Happy',
    emoji: '😊',
  },

  [UserMood.Calm]: {
    label: 'Calm',
    emoji: '😌',
  },

  [UserMood.Neutral]: {
    label: 'Neutral',
    emoji: '😐',
  },

  [UserMood.Sad]: {
    label: 'Sad',
    emoji: '😔',
  },

  [UserMood.Anxious]: {
    label: 'Anxious',
    emoji: '😟',
  },

  [UserMood.Angry]: {
    label: 'Angry',
    emoji: '😠',
  },

  [UserMood.Grateful]: {
    label: 'Grateful',
    emoji: '😌',
  },

  [UserMood.Hopeful]: {
    label: 'Hopeful',
    emoji: '😊',
  },

  [UserMood.Lonely]: {
    label: 'Lonely',
    emoji: '😟',
  },

  [UserMood.Confident]: {
    label: 'Hopeful',
    emoji: '😊',
  },

  [UserMood.Heartbroken]: {
    label: 'Lonely',
    emoji: '😟',
  },
} as const;
