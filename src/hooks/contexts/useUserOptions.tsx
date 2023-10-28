import { DEFAULT_CURRENCY } from '@/constants/default/CURRENCY';
import { SupportedLocales } from '@/constants/locales/supportedLocales';
import constate from 'constate';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useGetCompany from '../api/useGetCompany';

const useContextUserOptions = () => {
  const { data: companyData } = useGetCompany();
  const [currency, setCurrency] = useState<string>(companyData?.currency?.defaultCurrency || DEFAULT_CURRENCY);

  const { locale } = useRouter();
  const finalLocale = useMemo(
    () => (locale || companyData?.i18n.defaultLocale) as SupportedLocales,
    [companyData?.i18n?.defaultLocale, locale]
  );

  const handleSetCurrency = (newCurrency: string) => {
    if (!companyData?.currency.currencies.includes(newCurrency)) return;
    setCurrency(newCurrency);
  };

  return { locale: finalLocale, currency, handleSetCurrency };
};

export const [UserOptionsProvider, useUserOptions] = constate(useContextUserOptions);
