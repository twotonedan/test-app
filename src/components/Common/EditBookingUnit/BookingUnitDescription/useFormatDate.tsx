import { IBookingUnitTime } from '@/types/bookings';
import { isDate } from 'lodash';
import { set, format } from 'date-fns';

export type DateRange = { start: Date | number; end: Date | number };

export type DateOrDateRange = (Date | number) | DateRange;

const FORMAT = 'MM/dd, HH:mm';

const useFormatDate = () => {
  const formatDayMonthTime = (value: Date, time: IBookingUnitTime | undefined) => {
    if (isDate(value) && time) {
      const updatedDate = set(value, { hours: time?.hour, minutes: time?.minutes });
      return `${format(updatedDate, FORMAT)}`;
    }
    return '';
  };

  return { formatDayMonthTime };
};

export default useFormatDate;
