import { parseISO } from 'date-fns';
import { isNull, isString } from 'lodash';

export const safeParseISO = (date: number | string | Date | null) => {
  if (isString(date)) return parseISO(date);
  if (isNull(date)) return null;
  return new Date(date);
};
