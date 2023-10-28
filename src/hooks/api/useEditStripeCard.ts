import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@stripe/stripe-js';
import { GET_STRIPE_CARDS } from './useGetStripeCards';
import { deleteStripeCard } from './useDeleteStripeCard';
import { saveStripeCard } from './useSaveStripeCard';

export interface EditStripeCardPayload {
  stripeCustomerId: string;
  oldPaymentMethodId: string;
  newPaymentMethodId: string;
}

type Response = Card;

export const editStripeCard = async ({
  stripeCustomerId,
  oldPaymentMethodId,
  newPaymentMethodId,
}: EditStripeCardPayload) => {
  const [, newCard] = await Promise.all([
    deleteStripeCard({ paymentMethodId: oldPaymentMethodId }),
    saveStripeCard({ stripeCustomerId, paymentMethodId: newPaymentMethodId }),
  ]);

  return newCard;
};

const useEditStripeCard = (
  options?: UseMutationOptions<Response | Record<string, never>, unknown, EditStripeCardPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation(editStripeCard, {
    ...options,
    onSuccess(...params) {
      queryClient.invalidateQueries([GET_STRIPE_CARDS]);
      options?.onSuccess?.(...params);
    },
  });
};

export default useEditStripeCard;
