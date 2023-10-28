import { useCallback, useTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { AccessoryData, useCartData } from './contexts/useCartData';
import useQuery from './queries/useQuery';
import { defaultState } from './queries/BookingQuery/useGetBookingQuery';
import useEditingCartItemLS from './localStorage/useEditingCartItemLS';
import useLastBookingLS from './localStorage/useLastBookingLS';

type Props = {
  isEditingMode?: boolean;
  itemId: string;
  defaultAccessories: AccessoryData[];
  formBaseName: string; // TODO: TEST IF WE SHOULD REMOVE THIS.
  onClickConfirm?: (uniqueId: string) => void;
  resetQueryParam?: boolean;
};

const useAddToCart = ({ isEditingMode, itemId, defaultAccessories, onClickConfirm, resetQueryParam }: Props) => {
  const { handleSubmit, reset, formState } = useFormContext();

  const [, setQuery] = useQuery();
  const { parsedEditingCartItem, removeItem } = useEditingCartItemLS();
  const { handleSetBookingInformation } = useLastBookingLS();
  const [, startTransition] = useTransition();
  const { addToCart, setItemSettings } = useCartData();
  const isSubmitDisabled = !formState.isDirty || !formState.isValid;

  const onConfirmCallback = useCallback(
    (uniqueId: string) => {
      if (resetQueryParam) {
        setQuery({}, 'replace');
      }

      onClickConfirm?.(uniqueId);
    },
    [onClickConfirm, resetQueryParam, setQuery]
  );

  const handleOnClickConfirm = handleSubmit(formData => {
    startTransition(() => {
      if (!isEditingMode) {
        const uniqueId = uuidv4();
        addToCart(uniqueId, itemId, formData.bookingInformation, defaultAccessories);
        handleSetBookingInformation(formData.bookingInformation);
        reset({ bookingInformation: defaultState });
        onConfirmCallback(uniqueId);
      } else if (parsedEditingCartItem) {
        setItemSettings(parsedEditingCartItem?.$uniqueId, formData.bookingInformation);
        removeItem();
      }
      reset({ bookingInformation: defaultState });
    });
  });

  return { handleOnClickConfirm, isSubmitDisabled };
};

export default useAddToCart;
