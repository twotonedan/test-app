import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { IBooking, IBookingFilter } from '@/types/dockQueue';
import endpoints from '@/constants/endpoints';

export const GET_DOCK_QUEUE_BOOKINGS = 'GET_DOCK_QUEUE_BOOKINGS';
type Params = {
  filters?: IBookingFilter[] | [];
};
export const getDockQueueBookings = async ({ filters }: Params) => {
  return api({
    url: endpoints.dockQueueBookings,
    label: 'Dock Queue Bookings',
    method: 'POST',
    body: {
      filters,
    },
  })
    .then(data => data || [])
    .catch(() => []);
};

const useGetDockQueueBookings = <T = IBooking[] | []>(
  filters: IBookingFilter[] | [],
  opts?: UseQueryOptions<IBooking[], unknown, T, [typeof GET_DOCK_QUEUE_BOOKINGS, typeof filters]>
) => useQuery([GET_DOCK_QUEUE_BOOKINGS, filters], () => getDockQueueBookings({ filters }), opts);

export default useGetDockQueueBookings;
