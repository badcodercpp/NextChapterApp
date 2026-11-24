import RazorpayCheckout from 'react-native-razorpay';

interface RazorpayCheckoutInput {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  email?: string;
  contact?: string;
}

export async function openRazorpayCheckout(input: RazorpayCheckoutInput) {
  return RazorpayCheckout.open({
    key: input.keyId,
    order_id: input.orderId,
    amount: input.amount,
    currency: input.currency,
    name: input.name,
    description: input.description,
    prefill: {
      email: input.email ?? '',
      contact: input.contact ?? '',
    },
    theme: {
      color: '#6366F1',
    },
  });
}
