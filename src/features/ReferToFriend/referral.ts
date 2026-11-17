import { Share } from 'react-native';
import { showToast } from '@/components/Toast';

export const REFERRAL_BASE_URL = 'https://outdated.me/r';
export const DISCOUNT_PERCENT = 10;
const MAX_NAME_LENGTH = 10;
export const REFERRALS_FOR_REWARD = 3;

export function buildReferralCode(displayName?: string | null) {
  const name = (displayName ?? '')
    .trim()
    .split(/\s+/)[0]
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
    .slice(0, MAX_NAME_LENGTH);

  return `outdated_${name || 'FRIEND'}${DISCOUNT_PERCENT}`;
}

export async function shareText(message: string) {
  try {
    await Share.share({ message });
  } catch {
    showToast('Unable to open the share sheet', 'error');
  }
}

export function buildInviteMessage(code: string) {
  return `Join me on Outdated.me and let's support each other's wellness journey. Use my code ${code} for ${DISCOUNT_PERCENT}% off: ${REFERRAL_BASE_URL}/${code}`;
}
