import { api } from '@/utils/api';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import Stripe from 'stripe';
import { GET_STRIPE_CARDS } from './useGetStripeCards';

export interface DeleteStripeCardPayload {
  paymentMethodId: string;
}

type Response = Stripe.PaymentMethod;

export const deleteStripeCard = async (dataPayload: DeleteStripeCardPayload) => {
  return api({
    url: '/api/stripe/cards',
    method: 'DELETE',
    body: {
      data: dataPayload,
    },
    label: 'Booking Information',
  })
    .then((data: Response) => data)
    .catch(() => ({}));
};

const useDeleteStripeCard = (
  options?: UseMutationOptions<Response | Record<string, never>, unknown, DeleteStripeCardPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation(deleteStripeCard, {
    ...options,
    onSuccess(...params) {
      queryClient.invalidateQueries([GET_STRIPE_CARDS]);
      options?.onSuccess?.(...params);
    },
  });
};

export default useDeleteStripeCard;
