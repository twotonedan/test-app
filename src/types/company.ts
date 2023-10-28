import { SupportedLocales } from '@/constants/locales/supportedLocales';
import { IDateRangeCalendarInfo } from './common';
import { SupportedIconsEnum } from './enums';
import { IFooterList } from './footer';

export interface IHeaderMenuOption {
  id: number;
  icon: SupportedIconsEnum;
  text: string;
  path: string;
}

export interface IHeaderMenuOptions {
  id: number;
  requiredAuth?: boolean;
  options: IHeaderMenuOption[];
}

export interface ISocialLink {
  id: number;
  link: string;
  name:
    | SupportedIconsEnum.OUTLINED_CALL
    | SupportedIconsEnum.OUTLINED_CHAT
    | SupportedIconsEnum.OUTLINED_FACEBOOK
    | SupportedIconsEnum.OUTLINED_INSTAGRAM;
}

export interface ICompanyPayload {
  name: string;
  logo: string;
  calendarInfo: IDateRangeCalendarInfo;
  currency: {
    defaultCurrency: string;
    currencies: string[];
  };
  stripeAccount: {
    country: string;
  };

  i18n: {
    defaultLocale: SupportedLocales;
  };
  header: {
    menuOptions: IHeaderMenuOptions[];
  };
  footer: {
    items: IFooterList[];
    socialLinks: ISocialLink[];
  };
}
