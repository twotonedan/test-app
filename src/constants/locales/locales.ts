import { Locale } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { SupportedLocales } from './supportedLocales';

export const DateFnsLocales: Record<SupportedLocales, Locale> = {
  [SupportedLocales.EN]: enUS,
  [SupportedLocales.ES]: es,
};
