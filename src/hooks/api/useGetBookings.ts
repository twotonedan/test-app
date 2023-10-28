import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IBooking } from '@/types/bookings';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const GET_BOOKINGS = 'GET_BOOKINGS';

export const getMyBookings = async () => {
  return api({
    url: endpoints.bookings,
    label: 'Bookings',
    method: 'GET',
  })
    .then(data => data || [])
    .catch(() => []);
};

const useGetBookings = <T = IBooking[]>(opts?: UseQueryOptions<IBooking[], unknown, T, [typeof GET_BOOKINGS]>) =>
  useQuery([GET_BOOKINGS], getMyBookings, opts);

export default useGetBookings;
