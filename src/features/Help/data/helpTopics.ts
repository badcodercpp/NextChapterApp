import {
  BookOpen,
  CheckCircle2,
  CreditCard,
  Layers,
  type LucideIcon,
  ShieldCheck,
  User,
  UserPen,
} from 'lucide-react-native';

export type HelpTopicId =
  | 'start'
  | 'features'
  | 'account'
  | 'privacy'
  | 'billing';

export type HelpStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type HelpTopic = {
  id: HelpTopicId;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  overview: string;
  steps: HelpStep[];
  tip: string;
  related: HelpTopicId[];
};

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: 'start',
    icon: BookOpen,
    title: 'Getting Started',
    subtitle: 'Create your account and set up your journey',
    overview:
      'Get started with Outdated.me in just a few simple steps. Create your account, set up your profile, choose a journey, and begin your wellness progress.',
    steps: [
      {
        icon: User,
        title: 'Create an Account',
        description:
          'Sign up with your email or Google account to get started.',
      },
      {
        icon: UserPen,
        title: 'Set Up Your Profile',
        description: 'Add a few details so we can personalize your experience.',
      },
      {
        icon: Layers,
        title: 'Choose a Journey',
        description:
          'Pick a guided journey (e.g., Breakup, Stress, Confidence) that fits your current need.',
      },
      {
        icon: CheckCircle2,
        title: 'Start Your First Task',
        description:
          'Begin with a simple, daily task and take the first step toward feeling better.',
      },
    ],
    tip: 'Be consistent! Even a few minutes daily can make a big difference in your progress.',
    related: ['features', 'account'],
  },
  {
    id: 'features',
    icon: Layers,
    title: 'App Features',
    subtitle: 'Explore journeys, tracking, and more',
    overview:
      'Outdated.me brings guided journeys, daily tasks, mood check-ins and an AI companion together in one place to support your recovery.',
    steps: [
      {
        icon: Layers,
        title: 'Guided Journeys',
        description:
          'Follow a structured 90-day plan designed around your situation.',
      },
      {
        icon: CheckCircle2,
        title: 'Daily Tasks',
        description:
          'Small, achievable actions each day that build healthy habits.',
      },
      {
        icon: BookOpen,
        title: 'Mood Check-ins',
        description: 'Log how you feel and watch your progress over time.',
      },
      {
        icon: User,
        title: 'AI Companion',
        description:
          'Chat any time for support, reflection and gentle guidance.',
      },
    ],
    tip: 'Check in with your mood daily to spot patterns and celebrate progress.',
    related: ['start', 'account'],
  },
  {
    id: 'account',
    icon: User,
    title: 'Account & Profile',
    subtitle: 'Update your details and preferences',
    overview:
      'Manage your personal details, preferences and account settings so the app always feels like yours.',
    steps: [
      {
        icon: UserPen,
        title: 'Edit Your Profile',
        description:
          'Open Profile from the menu to change your name and details.',
      },
      {
        icon: ShieldCheck,
        title: 'Update Preferences',
        description: 'Adjust notifications and appearance from Settings.',
      },
      {
        icon: User,
        title: 'Sign Out',
        description:
          'Sign out any time from Settings. Your progress stays saved.',
      },
      {
        icon: CheckCircle2,
        title: 'Delete Your Account',
        description:
          'Want to leave? Contact support and we will remove your data.',
      },
    ],
    tip: 'Keep your profile up to date so recommendations stay relevant.',
    related: ['privacy', 'billing'],
  },
  {
    id: 'privacy',
    icon: ShieldCheck,
    title: 'Privacy & Data',
    subtitle: 'How we keep your data safe',
    overview:
      'Your conversations and check-ins are personal. We encrypt your data, never sell it, and give you control over it.',
    steps: [
      {
        icon: ShieldCheck,
        title: 'Encrypted Storage',
        description: 'Your data is encrypted in transit and at rest.',
      },
      {
        icon: User,
        title: 'You Are in Control',
        description:
          'Choose what you share and change your preferences at any time.',
      },
      {
        icon: BookOpen,
        title: 'No Selling of Data',
        description:
          'We never sell your personal information to third parties.',
      },
      {
        icon: CheckCircle2,
        title: 'Delete Anytime',
        description:
          'Request deletion of your account and data whenever you like.',
      },
    ],
    tip: 'Use a strong, unique password and keep your device locked.',
    related: ['account', 'billing'],
  },
  {
    id: 'billing',
    icon: CreditCard,
    title: 'Subscription & Billing',
    subtitle: 'Plans, payments, and cancellations',
    overview:
      'Start free and upgrade when you are ready. Premium unlocks every journey and deeper insights.',
    steps: [
      {
        icon: Layers,
        title: 'Choose a Plan',
        description: 'Compare Free and Premium from the Go Premium card.',
      },
      {
        icon: CreditCard,
        title: 'Manage Payment',
        description:
          'Payments are handled securely by the App Store or Google Play.',
      },
      {
        icon: CheckCircle2,
        title: 'Cancel Anytime',
        description:
          'Cancel in your store subscription settings. Access continues until the period ends.',
      },
      {
        icon: User,
        title: 'Need a Refund?',
        description: 'Contact support and we will help you with your request.',
      },
    ],
    tip: 'Cancel at least 24 hours before renewal to avoid being charged.',
    related: ['account', 'privacy'],
  },
];

export const getHelpTopic = (id: HelpTopicId) =>
  HELP_TOPICS.find(topic => topic.id === id);
