import { useStripe } from '@stripe/react-stripe-js';
import { PaymentMethodResult, CreatePaymentMethodData } from '@stripe/stripe-js';
import { useCallback } from 'react';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useCreatePaymentMethod = (
  options?: UseMutationOptions<PaymentMethodResult | undefined, unknown, CreatePaymentMethodData>
) => {
  const stripe = useStripe();

  const fn = useCallback(async (payload: CreatePaymentMethodData) => stripe?.createPaymentMethod?.(payload), [stripe]);

  return useMutation(fn, options);
};

export default useCreatePaymentMethod;
