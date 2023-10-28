/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
import { useEffect, useMemo } from 'react';
import { FieldPath, UseFormReturn } from 'react-hook-form';
import { IBookingInformationSchema } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import useEditingCartItemLS from './localStorage/useEditingCartItemLS';
import useUnmount from './useUnmount';
import { defaultState } from './queries/BookingQuery/useGetBookingQuery';

type Props = {
  cardId: string;
  form: UseFormReturn<IBookingInformationSchema>;
  baseName: FieldPath<IBookingInformationSchema>;
  onClearAll: () => void;
  disabled: boolean;
};

const useItemDetailEditing = ({ cardId, form, baseName, onClearAll, disabled }: Props) => {
  const { parsedEditingCartItem, removeItem } = useEditingCartItemLS({ enforceOnValidation: true });
  const isEditingEnabled = useMemo(
    () => parsedEditingCartItem?.cardId === cardId,
    [cardId, parsedEditingCartItem?.cardId]
  );

  useUnmount({
    omitFirstRender: true,
    fn: removeItem,
  });

  const canFormBeUpdatedOnEditing = () => !!(parsedEditingCartItem?.data && isEditingEnabled);

  useEffect(() => {
    if (disabled) return;
    if (canFormBeUpdatedOnEditing()) {
      return form.setValue(
        baseName,
        { ...defaultState, ...parsedEditingCartItem!.data },
        { shouldDirty: true, shouldValidate: true }
      );
    }
    onClearAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedEditingCartItem?.data, cardId]);

  useEffect(() => {
    if (!parsedEditingCartItem || (!disabled && canFormBeUpdatedOnEditing())) return;
    removeItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  return { isEditingEnabled };
};

export default useItemDetailEditing;
