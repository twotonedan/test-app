import { SupportedLocales } from '@/constants/locales/supportedLocales';
import constate from 'constate';
import { useRef } from 'react';

type Props = {
  locale: SupportedLocales;
  currency: string;
};

const useContextCurrencyFormatter = ({ locale, currency }: Props) => {
  const currencyFormatter = useRef(
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
    })
  ).current;

  const shortCurrencyFormatter = useRef(
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      currencyDisplay: 'narrowSymbol',
    })
  ).current;

  const format = (value: number) =>
    shortCurrencyFormatter.formatToParts(value).reduce((acc, part) => {
      if (part.type === 'currency') return `${part.value}${acc}`;
      return `${acc}${part.value}`;
    }, '');

  // TODO: Should we add a short range custom formatter?

  return { currencyFormatter, shortCurrencyFormatter: { format } };
};

export const [CurrencyFormatterProvider, useCurrencyFormatter] = constate(useContextCurrencyFormatter);
