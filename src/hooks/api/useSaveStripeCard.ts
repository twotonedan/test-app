import { api } from '@/utils/api';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@stripe/stripe-js';
import { GET_STRIPE_CARDS } from './useGetStripeCards';

export interface SaveStripeCardPayload {
  stripeCustomerId: string;
  paymentMethodId: string;
}

type Response = Card;

export const saveStripeCard = async (dataPayload: SaveStripeCardPayload) => {
  return api({
    url: '/api/stripe/cards',
    method: 'POST',
    body: {
      ...dataPayload,
    },
    label: 'Booking Information',
  })
    .then((data: Response) => data)
    .catch(() => ({}));
};

const useSaveStripeCard = (
  options?: UseMutationOptions<Response | Record<string, never>, unknown, SaveStripeCardPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation(saveStripeCard, {
    ...options,
    onSuccess(...params) {
      queryClient.invalidateQueries([GET_STRIPE_CARDS]);
      options?.onSuccess?.(...params);
    },
  });
};

export default useSaveStripeCard;
