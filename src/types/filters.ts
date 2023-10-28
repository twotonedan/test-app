import { omit } from 'lodash';
import { ILocation } from './accessories';
import { IQuantityLimits } from './common';
import { TimeRangeType } from './enums';
import { ValueOf } from './utils';

export interface IFilterOptionPriceRange {
  id: number;
  name: string;
  limits: IQuantityLimits;
}

export type IParsedHours = {
  label: string;
  value: number | string;
};

export interface IFilterOptionTimeRange {
  type: TimeRangeType;
  options?: IParsedHours[];
}

export interface IAmenityOption {
  label: string;
  id: number;
}

export interface IFilterOptionsAmenities {
  id: number;
  title: string;
  options: IAmenityOption[];
}

export interface IStatusOption {
  label: string;
  id: number;
}

export interface IUnitOption {
  label: string;
  id: number;
}

// cambiar a mayuscula la key
export enum IFeedFilterOptionsKeys {
  date = 'date',
  dateRange = 'dateRange',
  timeRange = 'timeRange',
  priceRange = 'priceRange',
  amenities = 'amenities',
  locations = 'locations',
}

export enum IBookingFilterOptionsKeys {
  date = 'date',
  dateRange = 'dateRange',
  status = 'status',
  unit = 'unit',
}

export const ICombinedFilterOptionsKeys = {
  ...IFeedFilterOptionsKeys,
  ...IBookingFilterOptionsKeys,
} as const;

export type ICombinedFilterOptionsKeysValues = ValueOf<typeof ICombinedFilterOptionsKeys>;

// export type ICombinedFilterOptionsKeys = IFeedFilterOptionsKeys | IBookingFilterOptionsKeys;

type IFilterOptionLocation = {
  options: ILocation[];
};

export interface IFeedFilterOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [IFeedFilterOptionsKeys.date]?: any; // TODO: Add filter options. Maybe a min-max limit?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [IFeedFilterOptionsKeys.dateRange]?: any; // TODO: Add filter options. Maybe a min-max limit?
  [IFeedFilterOptionsKeys.timeRange]?: IFilterOptionTimeRange;
  [IFeedFilterOptionsKeys.priceRange]?: IFilterOptionPriceRange;
  [IFeedFilterOptionsKeys.amenities]?: IFilterOptionsAmenities[];
  [IFeedFilterOptionsKeys.locations]?: IFilterOptionLocation;
}

export interface IBookingFilterOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [IBookingFilterOptionsKeys.date]?: any; // TODO: Add filter options. Maybe a min-max limit?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [IBookingFilterOptionsKeys.dateRange]?: any; // TODO: Add filter options. Maybe a min-max limit?
  [IBookingFilterOptionsKeys.status]?: IStatusOption[];
  [IBookingFilterOptionsKeys.unit]?: IUnitOption[];
}

export type IFilterOptions = IFeedFilterOptions | IBookingFilterOptions;

export const IBookingSupportedFilterKeys = {
  ...(omit(IBookingFilterOptionsKeys, [IBookingFilterOptionsKeys.date, IBookingFilterOptionsKeys.dateRange]) as {
    [key in Exclude<
      IBookingFilterOptionsKeys,
      IBookingFilterOptionsKeys.date | IBookingFilterOptionsKeys.dateRange
    >]: (typeof IBookingFilterOptionsKeys)[key];
  }),
  dateOrDateRange: 'dateOrDateRange',
} as const;

export const IFeedSupportedFilterKeys = {
  ...(omit(IFeedFilterOptionsKeys, [IFeedFilterOptionsKeys.date, IFeedFilterOptionsKeys.dateRange]) as {
    [key in Exclude<
      IFeedFilterOptionsKeys,
      IFeedFilterOptionsKeys.date | IFeedFilterOptionsKeys.dateRange
    >]: (typeof IFeedFilterOptionsKeys)[key];
  }),
  dateOrDateRange: 'dateOrDateRange',
} as const;

export const AllSupportedFilterKeys = {
  ...IFeedSupportedFilterKeys,
  ...IBookingSupportedFilterKeys,
} as const;

export type IBookingSupportedFilterKeysValues = ValueOf<typeof IBookingSupportedFilterKeys>;
export type IFeedSupportedFilterKeysValues = ValueOf<typeof IFeedSupportedFilterKeys>;
export type IFilterOptionsKeysValues = IBookingSupportedFilterKeysValues | IFeedSupportedFilterKeysValues;

export type IFilterDefaults = {
  isMultiDay: boolean;
  showUnavailable: boolean;
  locations?: ILocation[];
};
