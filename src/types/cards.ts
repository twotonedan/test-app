import { AccessoryData } from '@/hooks/contexts/useCartData';
import { IDateRange, IImage, IDateRangeCalendarInfo } from './common';
import { CardComponentOption, BookingInformationType, SupportedIconsEnum, TagColor, CheckoutMethod } from './enums';

export interface IAmenity {
  id: number;
  icon: SupportedIconsEnum;
  text: string;
}

export interface ICommonAvailableDate {
  id: number;
}

export interface IAvailableSingleDate extends ICommonAvailableDate {
  date: Date;
  otherDates?: Date[];
}

export interface IAvailableMultiDate extends ICommonAvailableDate {
  dateRange: { start: Date; end: Date };
}

export interface IDescription {
  text: string;
  maxChars: number;
}

export interface ICardPayload {
  id: string;
  image: { width: number; height: number; src: string };
  alt: string;
  imagesDetail: IImage[];
  title: string;
  tagline: string;
  description: IDescription;
  date?: Date;
  dateRange?: IDateRange;
  isUnavailable?: boolean;
  amenities?: IAmenity[];
  topSectionComponent?: CardComponentOption;
  bottomSectionComponent?: CardComponentOption;
  otherDates: IAvailableSingleDate[] | IAvailableMultiDate[];
  calendarInfo: IDateRangeCalendarInfo;
  bookingInformationOption?: BookingInformationType;
  limits: { max: number; min: number };
  tag: {
    label: string;
    color: TagColor;
  };
  defaultAccessories: AccessoryData[];
  checkoutMethod: CheckoutMethod;
  policies?: string;
}
