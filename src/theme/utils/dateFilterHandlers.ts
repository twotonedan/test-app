/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isValid } from 'date-fns';
import { DateRangeSchema } from '@/validationSchemas/common/dateRange';
import { IFeedFilterOptionsKeys } from '@/types/filters';

export interface IDateProps {
  id: string | number;
  date?: number | Date | null;
  formatDates: (date: number | Date) => string;
  setValue: (name: string, value: number | Date | null) => void;
  name: string;
  filterResetters: {
    [IFeedFilterOptionsKeys.date]: (name: string) => void;
  };
}

export interface IDateRangeProps {
  id: string | number;
  dateRange?: DateRangeSchema;
  formatDates: (date: number | Date) => string;
  setValue: (name: string, value: { start: number | Date | null; end: number | Date | null }) => void;
  name: string;
  filterResetters: {
    [IFeedFilterOptionsKeys.dateRange]: (name: string) => void;
  };
}

export const dateHandler = ({ id, date, formatDates, name, filterResetters }: IDateProps) => {
  if (!date || !isValid(date)) return undefined;
  return {
    id,
    label: formatDates(date),
    remove: () => filterResetters[IFeedFilterOptionsKeys.date](name),
  };
};

export const dateRangeHandler = ({ id, dateRange, formatDates, name, filterResetters }: IDateRangeProps) => {
  const { start, end } = dateRange || {};
  if (!isValid(dateRange?.start) || !isValid(dateRange?.end)) return undefined;
  return {
    id,
    label: `${formatDates(start!)} - ${formatDates(end!)}`,
    remove: () => filterResetters[IFeedFilterOptionsKeys.dateRange](name),
  };
};
