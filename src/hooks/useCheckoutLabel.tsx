import { CheckoutMethod } from '@/types/enums';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const useCheckoutLabel = (checkoutMethod: CheckoutMethod) => {
  const { t } = useTranslation('actions');

  return useMemo(
    () =>
      t(
        // eslint-disable-next-line no-nested-ternary
        checkoutMethod === CheckoutMethod.ADD_TO_CART
          ? 'addToCart'
          : checkoutMethod === CheckoutMethod.BOOK_NOW
          ? 'bookNow'
          : ''
      ),
    [checkoutMethod, t]
  );
};

export default useCheckoutLabel;
