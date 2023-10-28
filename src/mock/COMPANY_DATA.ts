import { SupportedLocales } from '@/constants/locales/supportedLocales';
import { ICompanyPayload } from '@/types/company';
import { SupportedIconsEnum } from '@/types/enums';
import { getCalendarInfo } from './calendarInfoGenerator';
import { FOOTER_ITEMS } from './FOOTER_ITEMS';

const COMPANY_DATA: ICompanyPayload = {
  name: 'Stellar IMS - Demo Company',
  logo: '/assets/images/default-logo.svg',
  calendarInfo: getCalendarInfo(),
  currency: {
    defaultCurrency: 'USD',
    currencies: ['USD', 'CAD', 'EUR', 'GBP', 'JPY', 'CNY'],
  },
  stripeAccount: {
    country: 'US',
  },
  i18n: {
    defaultLocale: SupportedLocales.EN,
  },
  header: {
    menuOptions: [
      {
        id: 1,
        requiredAuth: true,
        options: [
          { id: 1, icon: SupportedIconsEnum.PERSON_OUTLINE, text: 'myAccount', path: '' },
          { id: 2, icon: SupportedIconsEnum.EVENT_NOTE, text: 'myReservations', path: 'my-reservations' },
          { id: 3, icon: SupportedIconsEnum.FACT_CHECK_OUTLINED, text: 'mandatoryTest', path: '' },
        ],
      },
      {
        id: 2,
        options: [
          { id: 1, icon: SupportedIconsEnum.INFO_OUTLINED, text: 'aboutUs', path: '' },
          { id: 2, icon: SupportedIconsEnum.LOCAL_OFFER_OUTLINED, text: 'rentalsSales', path: '' },
          { id: 3, icon: SupportedIconsEnum.BUILD_OUTLINED, text: 'service', path: '' },
          { id: 4, icon: SupportedIconsEnum.ANCHOR_OUTLINED, text: 'slips', path: '' },
          { id: 5, icon: SupportedIconsEnum.ANCHOR_OUTLINED, text: 'dockQueue', path: '/dock-queue' },
        ],
      },
      {
        id: 3,
        options: [
          { id: 1, icon: SupportedIconsEnum.HELP_OUTLINE_OUTLINED, text: 'faqs', path: '' },
          { id: 2, icon: SupportedIconsEnum.HEADSET_MIC_OUTLINED, text: 'contactUs', path: '' },
        ],
      },
    ],
  },
  footer: {
    items: FOOTER_ITEMS,
    socialLinks: [
      {
        id: 1,
        link: '#',
        name: SupportedIconsEnum.OUTLINED_FACEBOOK,
      },
      {
        id: 2,
        link: '#',
        name: SupportedIconsEnum.OUTLINED_INSTAGRAM,
      },
      {
        id: 3,
        link: '#',
        name: SupportedIconsEnum.OUTLINED_CHAT,
      },
      {
        id: 4,
        link: '#',
        name: SupportedIconsEnum.OUTLINED_CALL,
      },
    ],
  },
};

export default COMPANY_DATA;
