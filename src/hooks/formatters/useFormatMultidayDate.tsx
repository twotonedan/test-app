import useIntlFormat, { IntlFormatOptions } from './useIntlFormat';

const intlFormatter: IntlFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

export type DateRange = { start: Date | number; end: Date | number };

export type DateOrDateRange = (Date | number) | DateRange;

const useFormatMultidayDate = () => {
  const { intlFormat } = useIntlFormat();
  const formatDates = (value: Date | number) => intlFormat(value, intlFormatter);
  return { formatDates };
};

export default useFormatMultidayDate;
