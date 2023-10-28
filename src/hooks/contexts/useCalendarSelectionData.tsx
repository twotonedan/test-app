import { IDateRange, IDateRangeCalendarInfo } from '@/types/common';
import { safeParseISO } from '@/utils/safeParseISO';
import { eachDayOfIntervalKeepTZ, toUTC } from '@/utils/timezone';
import { DateRangeSchema } from '@/validationSchemas/common/dateRange';
import constate from 'constate';
import { endOfDay, isDate, isValid, startOfDay } from 'date-fns';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

export const calculateCalendarPrice = (
  calendarInfo: IDateRangeCalendarInfo | undefined,
  { date, dateRange }: { date?: Date | null; dateRange?: DateRangeSchema }
) => {
  const parsedDate = date ? safeParseISO(date) : undefined;
  const parsedDateRange = dateRange
    ? { start: safeParseISO(dateRange.start), end: safeParseISO(dateRange.end) }
    : undefined;

  if (parsedDateRange) {
    parsedDateRange.start = parsedDateRange.start ? toUTC(parsedDateRange.start) : null;
    parsedDateRange.end = parsedDateRange.end ? toUTC(startOfDay(parsedDateRange.end), endOfDay) : null;
  }

  if (!calendarInfo) return {};
  if (parsedDate && isDate(parsedDate) && isValid(parsedDate))
    return calendarInfo[toUTC(parsedDate).toISOString()] || {};
  if (
    isDate(parsedDateRange?.start) &&
    isDate(parsedDateRange?.end) &&
    isValid(parsedDateRange?.start) &&
    isValid(parsedDateRange?.end)
  ) {
    return eachDayOfIntervalKeepTZ(parsedDateRange as IDateRange).reduce(
      (acc, d) => {
        const dayInfo = calendarInfo[d.toISOString()];

        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          price: acc.price! + (dayInfo?.price || 0),
          isHoliday: acc.isHoliday || dayInfo?.isHoliday,
          isUnavailable: acc.isUnavailable || dayInfo?.isUnavailable,
        };
      },
      { price: 0, isHoliday: false, isUnavailable: false } as IDateRangeCalendarInfo[string]
    );
  }
  return {};
};

type Props = {
  baseName: string;
  calendarInfo?: IDateRangeCalendarInfo;
};

const useContextCalendarSelectionData = ({ baseName, calendarInfo }: Props) => {
  const dateRange = useWatch({ name: `${baseName}.dateRange` });
  const date = useWatch({ name: `${baseName}.date` });

  return useMemo(() => calculateCalendarPrice(calendarInfo, { date, dateRange }), [calendarInfo, date, dateRange]);
};

export const [CalendarSelectionDataProvider, useCalendarSelectionData] = constate(useContextCalendarSelectionData);
