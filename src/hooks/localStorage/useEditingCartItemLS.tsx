/* eslint-disable consistent-return */
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import useLocalStorageState from 'use-local-storage-state';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { validateBookingInformation } from '../queries/BookingQuery/useSetBookingQuery';
import { parseBookingQuery } from '../queries/BookingQuery/useGetBookingQuery';

type EditingCartItem = {
  $uniqueId: string;
  cardId: string;
  data: IBookingInformation;
};

type Props = {
  enforceOnValidation?: boolean;
};
const useEditingCartItemLS = ({ enforceOnValidation }: Props = {}) => {
  const [editingCartItem, setEditingCartItem, { removeItem }] =
    useLocalStorageState<EditingCartItem>('editingCartItem');
  const [parsedEditingCartItem, setParsedEditingCartItem] = useState<EditingCartItem | null>(null);

  const handleSetEditingCartItem = ($uniqueId: string, cardId: string, data: IBookingInformation) => {
    const [validatedData, isError] = validateBookingInformation(data);
    if (isError || isEmpty(validatedData.bookingInformation)) return;
    setEditingCartItem({ $uniqueId, cardId, data: validatedData.bookingInformation });
  };

  useEffect(() => {
    if (!editingCartItem?.data) return setParsedEditingCartItem(null);

    const validatedData = parseBookingQuery(
      editingCartItem.data as unknown as Record<string, unknown>,
      cartItem => setEditingCartItem({ ...editingCartItem, data: cartItem as IBookingInformation }),
      enforceOnValidation
    );

    const parsedData = isEmpty(validatedData)
      ? null
      : { ...editingCartItem, data: validatedData as IBookingInformation };

    setParsedEditingCartItem(parsedData);
  }, [editingCartItem, enforceOnValidation, setEditingCartItem]);

  return { parsedEditingCartItem, handleSetEditingCartItem, removeItem };
};

export default useEditingCartItemLS;
