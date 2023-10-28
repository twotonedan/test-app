import { IDateRangeCalendarInfo } from '@/types/common';
import { eachDayOfIntervalKeepTZ, toUTC } from '@/utils/timezone';
import { startOfMonth, addMonths } from 'date-fns';
import { random } from 'lodash';

const start = toUTC(new Date(), startOfMonth);
const itemsInterval = { start, end: addMonths(start, 12) };

export const getCalendarInfo = (withPrices?: boolean) => {
  return eachDayOfIntervalKeepTZ(itemsInterval).reduce<IDateRangeCalendarInfo>(
    (acc, el) => ({
      ...acc,
      [el.toISOString()]: {
        price: withPrices ? random(100, 99999) : undefined,
        isHoliday: random(0, 10) < 1,
        isUnavailable: random(0, 10) < 1,
      },
    }),
    {}
  );
};

export const calendarInfo = getCalendarInfo(true);
