import { IPromoCodeForm } from '@/validationSchemas/checkoutPromoCodeSchema/checkoutPromoCodeSchema';
import { UseFormReturn } from 'react-hook-form';
import { useCalculatePrice } from './contexts/useCalculatePrice';
import useGetPromoDiscount from './api/useGetPromoDiscount';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<IPromoCodeForm, any>;
};

const usePromoCode = ({ form }: Props) => {
  const { setPromoCodeData } = useCalculatePrice();
  const { code } = form.getValues();

  const { refetch, isLoading } = useGetPromoDiscount(code, {
    enabled: false,
    retry: false,
    onSuccess: amount => setPromoCodeData({ key: code, amount }),
    onError: error => {
      const { message } = error as Error;
      form.setError('code', { message });
    },
  });

  const getPromoAmount = () => refetch();

  const resetPromoCode = () => {
    setPromoCodeData(undefined);
    form.setValue('code', '');
  };

  return { getPromoAmount, resetPromoCode, isLoading };
};

export default usePromoCode;
