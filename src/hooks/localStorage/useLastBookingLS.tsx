import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import useLocalStorageState from 'use-local-storage-state';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { validateBookingInformation } from '../queries/BookingQuery/useSetBookingQuery';
import { parseBookingQuery } from '../queries/BookingQuery/useGetBookingQuery';

type Props = {
  enforceOnValidation?: boolean;
};

const useLastBookingLS = ({ enforceOnValidation }: Props = {}) => {
  const [bookingInformation, setBookingInformation, { removeItem }] =
    useLocalStorageState<IBookingInformation>('lastBooking');
  const [parsedBookingInformation, setParsedBookingInformation] = useState<IBookingInformation | null>(null);

  const handleSetBookingInformation = (data: IBookingInformation) => {
    const [validatedData, isError] = validateBookingInformation(data);
    if (isError || isEmpty(validatedData.bookingInformation)) return;
    setBookingInformation(validatedData.bookingInformation);
  };

  useEffect(() => {
    if (!bookingInformation) return;

    const validatedData = parseBookingQuery(
      bookingInformation as unknown as Record<string, unknown>,
      bookingData => setBookingInformation(bookingData as IBookingInformation),
      enforceOnValidation
    );

    const parsedData = isEmpty(validatedData) ? null : (validatedData as IBookingInformation);

    setParsedBookingInformation(parsedData);
  }, [bookingInformation, enforceOnValidation, setBookingInformation]);

  return { parsedBookingInformation, handleSetBookingInformation, removeItem };
};

export default useLastBookingLS;
