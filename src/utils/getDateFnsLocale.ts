import { DateFnsLocales } from '@/constants/locales/locales';
import { SupportedLocales } from '@/constants/locales/supportedLocales';

export const getDateFnsLocale = (locale: string) => {
  const optionsToTest = [locale.substring(0, 2)] as SupportedLocales[];

  const validLocale = optionsToTest.find(option => !!DateFnsLocales[option]);
  return validLocale ? DateFnsLocales[validLocale] : DateFnsLocales.en;
};
