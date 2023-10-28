import { isValid } from 'date-fns';
import { isDate, isNumber } from 'lodash';
import useIntlFormat, { IntlFormatOptions } from './useIntlFormat';

const intlFormatter: IntlFormatOptions = { day: '2-digit', month: '2-digit' };
const intlFormatterMonthYear: IntlFormatOptions = { month: '2-digit', year: '2-digit' };

export type DateRange = { start: Date | number; end: Date | number };

export type DateOrDateRange = (Date | number) | DateRange;

const useTwoDigitsFormatDate = () => {
  const { intlFormat } = useIntlFormat();

  const formatter = (value: Date | number) => intlFormat(value, intlFormatter);
  const formatterMonthYear = (value: Date | number) => intlFormat(value, intlFormatterMonthYear);

  const formatDates = (value?: DateOrDateRange) => {
    if (isDate(value) || isNumber(value)) return `${formatter(value)}`;
    if (value && isValid(value?.start) && isValid(value?.end))
      return `${formatter(value.start)} - ${formatter(value.end)}`;
    return '';
  };

  const formatDayMonthTime = (value?: Date, timeStart?: string, timeEnd?: string) => {
    if (isDate(value) || isNumber(value)) return `${formatter(value)}, ${timeStart}`;
    if (value && isValid(value) && isValid(value))
      return `${formatter(value)}, ${timeStart} - ${formatter(value)}, ${timeEnd}`;
    return '';
  };

  const formatMonthYear = (value: number | Date, ensureLeadingZeroes?: boolean) => {
    const formatted = formatterMonthYear(value);

    if (ensureLeadingZeroes) {
      const [month, year] = formatted.split('/');
      return `${month.padStart(2, '0')}/${year.padStart(2, '0')}`;
    }

    return formatted;
  };

  return { formatDates, formatMonthYear, formatDayMonthTime };
};

export default useTwoDigitsFormatDate;
