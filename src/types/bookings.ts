import { IImage } from './common';
import { TagColor } from './enums';
import { IBookingFilterOptions, IBookingSupportedFilterKeysValues } from './filters';

export enum BookingStatusEnum {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  CANCELLATION_REQUESTED = 'cancellationRequested',
}

export enum BookingActionRequiredEnum {
  LIABILITY_WAIVER = 'liabilityWaiver',
  CHECK_IN = 'checkIn',
  CHECK_OUT = 'checkOutLabel',
}

export interface BookingActionRequiredItem {
  name: BookingActionRequiredEnum;
  completed: boolean;
  link?: string;
}

export interface IPaymentMethodInfo {
  brand: string;
  last4: string;
}

export interface IPaymentHistoryItem {
  date: Date;
  amount: number;
  paymentMethod: IPaymentMethodInfo;
}

export interface IBookingTime {
  startDate?: Date;
  singleDate?: Date;
  startTime?: IBookingUnitTime;
  endDate?: Date;
  endTime?: IBookingUnitTime;
  singleTime?: IBookingUnitTime;
}

export interface IBookingUnitTime {
  hour: number;
  minutes: number;
}

export interface IBookingUnit {
  id: string;
  title: string;
  image: { width: number; height: number; src: string };
  alt: string;
  imagesDetail: IImage[];
  bookingTime: IBookingTime;
  status: {
    label: BookingStatusEnum;
    color: TagColor;
  };
  actionRequiredItems?: BookingActionRequiredItem[];
  locationName: string;
  price: number;
  accessories?: IBookingUnitAccessory[];
  guests?: number;
  drivers?: number;
}

export interface IBookingUnitAccessory {
  id: string;
  title: string;
  location: string;
  quantity: number;
  price: number;
  tag?: {
    label: string;
    color: TagColor;
  };
}

export type IBookingFilterData = {
  settings?: IBookingSettings;
  options?: IBookingFilterOptions;
};

export interface IBookingSettings {
  filtersToShow: IBookingSupportedFilterKeysValues[];
}

export interface IBooking {
  id: string;
  balanceDue: number;
  bookingUnits: IBookingUnit[];
  paymentHistory?: IPaymentHistoryItem[];
}
