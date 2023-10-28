import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { IBooking, IBookingFilter } from '@/types/dockQueue';
import endpoints from '@/constants/endpoints';

export const GET_WATER_QUEUE_BOOKINGS = 'GET_WATER_QUEUE_BOOKINGS';
type Params = {
  filters?: IBookingFilter[] | [];
};
export const getWaterQueueBookings = async ({ filters }: Params) => {
  return api({
    url: endpoints.waterQueueBookings,
    label: 'Water Queue Bookings',
    method: 'POST',
    body: {
      filters,
    },
  })
    .then(data => data || [])
    .catch(() => []);
};

const useGetWaterQueueBookings = <T = IBooking[] | []>(
  filters: IBookingFilter[] | [],
  opts?: UseQueryOptions<IBooking[], unknown, T, [typeof GET_WATER_QUEUE_BOOKINGS, typeof filters]>
) => useQuery([GET_WATER_QUEUE_BOOKINGS, filters], () => getWaterQueueBookings({ filters }), opts);

export default useGetWaterQueueBookings;
