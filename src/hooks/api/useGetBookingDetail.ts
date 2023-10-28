import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IBooking } from '@/types/dockQueue';

export const GET_BOOKING_DETAIL = 'GET_BOOKING_DETAIL';

export const GetBookingDetail = async (bookingId: string) => {
  return api({
    url: endpoints.dockQueueBookings,
    method: 'POST',
    label: 'Booking Detail',
    body: {
      filters: {
        id: 'id',
        value: bookingId,
      },
    },
  })
    .then(data => data[0])
    .catch(() => ({}));
};

const useGetBookingDetail = <T = IBooking>(
  bookingId: string,
  opts?: UseQueryOptions<IBooking | Record<string, never>, unknown, T, [typeof GET_BOOKING_DETAIL, string]>
) => useQuery([GET_BOOKING_DETAIL, bookingId], () => GetBookingDetail(bookingId), opts);

export default useGetBookingDetail;
