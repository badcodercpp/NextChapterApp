import {
  BarChart3,
  Brain,
  Infinity as InfinityIcon,
} from 'lucide-react-native';
export type PlanId = 'annual' | 'quarterly' | 'monthly';

export const PLANS = [
  {
    id: 'annual' as PlanId,
    name: 'Annual',
    price: '₹2,499',
    period: '/ year',
    perMonth: 'Just ₹208 / month',
    save: 'Save 42%',
    badge: 'Best Value',
  },
  {
    id: 'quarterly' as PlanId,
    name: 'Quarterly',
    price: '₹749',
    period: '/ 3 months',
    perMonth: 'Just ₹250 / month',
    save: 'Save 30%',
  },
  {
    id: 'monthly' as PlanId,
    name: 'Monthly',
    price: '₹349',
    period: '/ month',
  },
];

export const HIGHLIGHTS = [
  { icon: InfinityIcon, label: 'Unlimited\nJourneys' },
  { icon: InfinityIcon, label: 'Unlimited \n Session' },
  { icon: BarChart3, label: 'Deeper\nInsights' },
  { icon: Brain, label: 'AI\n Coach' },
];

export const BENEFITS = [
  'Access to all premium journeys',
  'Personalized AI coaching & support',
  'Advanced mood & recovery insights',
  'Export your journal and progress',
  'Cancel anytime',
];
