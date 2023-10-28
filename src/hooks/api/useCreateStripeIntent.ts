import { api } from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import Stripe from 'stripe';
import { CartData } from '../contexts/useCartData';
import { PromoCode } from '../contexts/useCalculatePrice';

export interface PaymentPayload {
  paymentMethodId?: string | null;
  stripeCustomerId?: string | null;
  cartData: CartData[];
  creditsData?: number;
  promoCodeData: PromoCode;
  confirm?: boolean;
}

export type IntentResponse = {
  message: string;
  nextStepsMessage: string;
  paymentIntent: Stripe.PaymentIntent;
};

export const createStripeIntent = async (dataPayload: PaymentPayload) => {
  return api({
    url: '/api/stripe/pay',
    method: 'POST',
    body: {
      ...dataPayload,
    },
    label: 'Booking Information',
  })
    .then((data: Response) => data)
    .catch(() => ({}));
};

const useCreateStripeIntent = (
  options?: UseMutationOptions<Response | Record<string, never>, unknown, PaymentPayload>
) => {
  return useMutation(createStripeIntent, options);
};

export default useCreateStripeIntent;
