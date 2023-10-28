import { CheckoutStepsPayload } from '@/mock/CHECKOUT';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_CHECKOUT_STEPS = 'GET_CHECKOUT_STEPS';

export const getCheckoutSteps = async () => {
  return api({
    url: endpoints.checkoutSteps,
    method: 'GET',
    label: 'Checkout Steps',
  })
    .then(data => data)
    .catch(() => ({}));
};

const useGetCheckoutSteps = <T = CheckoutStepsPayload>(
  opts?: UseQueryOptions<CheckoutStepsPayload, unknown, T, [typeof GET_CHECKOUT_STEPS]>
) => useQuery([GET_CHECKOUT_STEPS], getCheckoutSteps, opts);

export default useGetCheckoutSteps;
