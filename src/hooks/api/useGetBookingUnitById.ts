import { BOOKINGS_DATA } from '@/mock/BOOKINGS_DATA';
import { IBookingUnit } from '@/types/bookings';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const GET_BOOKING_UNIT_BY_ID = 'GET_BOOKING_UNIT_BY_ID';

export const getBookingUnitById = async (id: string) => {
  let item: IBookingUnit | undefined;

  BOOKINGS_DATA.some(booking => {
    item = booking.bookingUnits.find(unit => unit.id === id);
    return item !== undefined;
  });

  if (!item) {
    const [firstBooking] = BOOKINGS_DATA;
    if (firstBooking && firstBooking.bookingUnits.length > 0) {
      [item] = firstBooking.bookingUnits;
    }
  }

  return new Promise<IBookingUnit | undefined>(resolve => {
    setTimeout(() => resolve(item), 10);
  });
};

const useGetBookingUnitById = <T = IBookingUnit | undefined>(
  id: string,
  opts?: UseQueryOptions<IBookingUnit | undefined, unknown, T, [typeof GET_BOOKING_UNIT_BY_ID, typeof id]>
) => useQuery([GET_BOOKING_UNIT_BY_ID, id], () => getBookingUnitById(id), opts);

export default useGetBookingUnitById;
