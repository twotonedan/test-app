import { IBookingsSettings } from '@/mock/BOOKINGS_SETTINGS';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const GET_BOOKINGS_SETTINGS = 'GET_BOOKINGS_SETTINGS';

export const getMyBookingSettings = async () => {
  return api({
    url: endpoints.bookingSettings,
    method: 'GET',
    label: 'Booking Settings',
  })
    .then(data => data)
    .catch(() => ({}));
};

const useGetBookingsSettings = <T = IBookingsSettings>(
  opts?: UseQueryOptions<IBookingsSettings, unknown, T, [typeof GET_BOOKINGS_SETTINGS]>
) => useQuery([GET_BOOKINGS_SETTINGS], getMyBookingSettings, opts);

export default useGetBookingsSettings;
