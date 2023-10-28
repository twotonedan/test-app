import { BookingInformation } from '@/mock/BOOKING_INFORMATION';
import { BookingInformationType } from '@/types/enums';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_BOOKING_TIMERANGE_BY_DURATION = 'GET_BOOKING_TIMERANGE_BY_DURATION';

export const getBookingTimeRangeByDuration = async (duration: number) => {
  return api({
    url: endpoints.bookingTimeRangeByDuration,
    method: 'POST',
    body: {
      duration,
    },
    label: 'Booking Information',
  })
    .then((data: BookingInformation[BookingInformationType.PREDEFINED]) => data)
    .catch(() => ({}));
};

const useGetBookingTimeRangeByDuration = <T = BookingInformation[BookingInformationType.PREDEFINED]['options']>(
  duration: number, // TODO: THIS DURATION IS JUST TO FILTER THE MOCK DATA. THIS SHOULD BE SENT TO THE API
  opts?: UseQueryOptions<
    BookingInformation[BookingInformationType.PREDEFINED] | Record<string, never>,
    unknown,
    T,
    [typeof GET_BOOKING_TIMERANGE_BY_DURATION, typeof duration]
  >
) => useQuery([GET_BOOKING_TIMERANGE_BY_DURATION, duration], () => getBookingTimeRangeByDuration(duration), opts);

export default useGetBookingTimeRangeByDuration;
