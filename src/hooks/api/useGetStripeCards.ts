import { api } from '@/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Stripe from 'stripe';

export const GET_STRIPE_CARDS = 'GET_STRIPE_CARDS';

type Response = Stripe.PaymentMethod[];

export const getStripeCards = async (stripeCustomerId: string) => {
  return api({
    url: '/api/stripe/cards',
    body: {
      params: { stripeCustomerId },
    },
    label: 'Booking Information',
  })
    .then((data: Response) => data)
    .catch(() => ({}));
};

const useGetStripeCards = <T = Response>(
  stripeCustomerId: string,
  opts?: UseQueryOptions<
    Response | Record<string, never>,
    unknown,
    T,
    [typeof GET_STRIPE_CARDS, typeof stripeCustomerId]
  >
) => useQuery([GET_STRIPE_CARDS, stripeCustomerId], () => getStripeCards(stripeCustomerId), opts);

export default useGetStripeCards;
