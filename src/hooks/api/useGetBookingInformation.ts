import { BookingInformation } from '@/mock/BOOKING_INFORMATION';
import { BookingInformationType } from '@/types/enums';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_BOOKING_INFORMATION = 'GET_BOOKING_INFORMATION';

export const getBookingInformation = async (type: BookingInformationType) => {
  return api({
    url: endpoints.bookingInformation,
    method: 'POST',
    body: {
      type,
    },
    label: 'Booking Information',
  })
    .then((data: BookingInformation) => data[type])
    .catch(() => ({}));
};

const useGetBookingInformation = <T = BookingInformation[BookingInformationType]>(
  type: BookingInformationType, // TODO: THIS TYPE IS JUST TO FILTER THE MOCK DATA. THIS SHOULD BE A ITEM ID TO SEND TO THE API
  opts?: UseQueryOptions<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BookingInformation[BookingInformationType] | any,
    unknown,
    T,
    [typeof GET_BOOKING_INFORMATION, typeof type]
  >
) => useQuery([GET_BOOKING_INFORMATION, type], () => getBookingInformation(type), opts);

export default useGetBookingInformation;
