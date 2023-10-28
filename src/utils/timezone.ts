import { addDays, startOfDay, subMinutes } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export const calcZonedDate = (
  date: string | number | Date,
  tz: string,
  cb: (d: Date, options?: object) => Date = d => d,
  options = null
) => {
  const inputZoned = utcToZonedTime(date, tz);
  const fnZoned = cb(inputZoned, options || undefined);
  return zonedTimeToUtc(fnZoned, tz);
};

export const toUTC = (d: Date, cb: (d: Date, options?: object) => Date = startOfDay) => calcZonedDate(d, 'UTC', cb);

export const eachDayOfIntervalKeepTZ = ({ start, end }: { start: Date; end: Date }) => {
  let accumulator = start;
  const days: Date[] = [];

  while (end >= accumulator) {
    days.push(accumulator);
    accumulator = addDays(accumulator, 1);
  }

  return days;
};

export const eachUTCDayOfInterval = ({ start, end = new Date() }: { start: Date; end?: Date }) => {
  const offset = {
    start: start.getTimezoneOffset(),
    end: end.getTimezoneOffset(),
  };

  const adjusted = {
    start: subMinutes(startOfDay(start.getTime()), offset.start),
    end: subMinutes(startOfDay(end.getTime()), offset.end),
  };

  return eachDayOfIntervalKeepTZ({ start: adjusted.start, end });
};
