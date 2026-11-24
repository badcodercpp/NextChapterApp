import { selectAvailablePlans, selectMe } from '@/state/selectors';
import { useCallback, useEffect, useState } from 'react';
import {
  useCreatePurchaseMutation,
  useLazyAvailablePlansQuery,
  useLazyMyAccessQuery,
  useVerifyPurchasePaymentMutation,
} from '@/__generated__/graphql';

import { openRazorpayCheckout } from '@/services/payment/paymentService';
import { useSelector } from 'react-redux';

export const usePlan = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPendingPurchase, setIsPendingPurchase] = useState<boolean>(false);

  const { data: availablePlans } = useSelector(selectAvailablePlans);
  const { data: me } = useSelector(selectMe);

  const [triggerLazyAvailablePlansQuery] = useLazyAvailablePlansQuery();

  const [triggerLazyMyAccessQuery] = useLazyMyAccessQuery();
  const [triggerCreatePurchaseMutation] = useCreatePurchaseMutation();
  const [triggerVerifyPurchasePaymentMutation] =
    useVerifyPurchasePaymentMutation();

  const fetchAvailablePlans = useCallback(async () => {
    try {
      setIsPending(true);
      await triggerLazyAvailablePlansQuery();
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsPending(false);
    }
  }, [triggerLazyAvailablePlansQuery]);

  const handlePurchase = async (planId: string) => {
    try {
      setIsPendingPurchase(true);
      // 1. Ask backend to create purchase and Razorpay order.
      const { createPurchase: createPurchaseResult } =
        await triggerCreatePurchaseMutation({
          input: {
            planId,
          },
        }).unwrap();

      setIsPendingPurchase(false);

      // 2. Open native Razorpay Checkout.

      const paymentResult = await openRazorpayCheckout({
        keyId: createPurchaseResult.keyId,
        orderId: createPurchaseResult.razorpayOrderId,
        amount: createPurchaseResult.amount,
        currency: createPurchaseResult.currency,
        name: 'OutdatedMe',
        description: 'Premium Recovery Plan',
        email: me?.email ?? '',
        contact: me?.phone ?? '',
      });

      // 3. Send Razorpay response to backend for verification.
      const verifiedPurchase = await triggerVerifyPurchasePaymentMutation({
        input: {
          razorpayOrderId: paymentResult.razorpay_order_id,
          razorpayPaymentId: paymentResult.razorpay_payment_id,
          razorpaySignature: paymentResult.razorpay_signature,
        },
      }).unwrap();

      console.log('verifiedPurchase');
      console.log(verifiedPurchase);

      // 4. Refresh access information.
      await triggerLazyMyAccessQuery();

      // 5. Show success.
      // Navigate to your premium success screen.
    } catch (error: any) {
      console.log('Payment flow error:', error);

      // Payment cancellation/failure is not necessarily
      // the same as backend verification failure.
    } finally {
      setIsPendingPurchase(false);
    }
  };

  useEffect(() => {
    fetchAvailablePlans();
  }, [fetchAvailablePlans]);

  return {
    isPending,
    availablePlans,
    handlePurchase,
    isPendingPurchase,
  };
};
