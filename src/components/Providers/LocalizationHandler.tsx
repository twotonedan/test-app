import { CurrencyFormatterProvider } from '@/hooks/contexts/useCurrencyFormatter';
import { useUserOptions } from '@/hooks/contexts/useUserOptions';
import { getDateFnsLocale } from '@/utils/getDateFnsLocale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { setDefaultOptions } from 'date-fns';
import { ReactNode, useMemo } from 'react';

type Props = {
  children: ReactNode;
};

const LocalizationHandler = ({ children }: Props) => {
  const { locale, currency } = useUserOptions();
  const dateFnsLocale = useMemo(() => getDateFnsLocale(locale), [locale]);

  useMemo(() => {
    setDefaultOptions({ locale: dateFnsLocale });
  }, [dateFnsLocale]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={dateFnsLocale}>
      <CurrencyFormatterProvider locale={locale} currency={currency}>
        {children}
      </CurrencyFormatterProvider>
    </LocalizationProvider>
  );
};

export default LocalizationHandler;
