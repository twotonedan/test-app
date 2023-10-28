import { useCallback } from 'react';
import { intlFormat as dateFnsIntlFormat } from 'date-fns';
import { useUserOptions } from '../contexts/useUserOptions';

export type IntlFormatOptions = Parameters<typeof dateFnsIntlFormat>[1];

const useIntlFormat = () => {
  const { locale } = useUserOptions();

  const intlFormat = useCallback(
    (date: number | Date, formatOptions?: IntlFormatOptions) => dateFnsIntlFormat(date, formatOptions, { locale }),
    [locale]
  );

  return { intlFormat };
};

export default useIntlFormat;
