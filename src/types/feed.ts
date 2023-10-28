import { IQuantityLimits } from '@/types/common';
import { CategoryType, SupportedIconsEnum, TimeRangeType } from './enums';
import { IFilterDefaults, IFeedSupportedFilterKeysValues, IFeedFilterOptions } from './filters';

export interface IFeedCategory {
  id: number;
  icon: SupportedIconsEnum;
  name: string;
  type: CategoryType;
}

export interface IFeedFilterOptionPriceRange {
  id: number;
  name: string;
  limits: IQuantityLimits;
}

export type IParsedHours = {
  label: string;
  value: number | string;
};

export interface IFeedFilterOptionTimeRange {
  type: TimeRangeType;
  options?: IParsedHours[];
}

export interface IAmenityOption {
  label: string;
  id: number;
}

export interface IFeedFilterOptionsAmenities {
  id: number;
  title: string;
  options: IAmenityOption[];
}

export enum IFeedFilterOptionsKeys {
  date = 'date',
  dateRange = 'dateRange',
  timeRange = 'timeRange',
  priceRange = 'priceRange',
  amenities = 'amenities',
}

export type IFilterSettings = {
  allowMultidayChange: boolean;
  filtersToShowOnFeed?: IFeedSupportedFilterKeysValues[];
};

export type IAddFilterData = {
  [key in CategoryType]?: {
    settings?: IFilterSettings;
    defaults?: IFilterDefaults;
    options?: IFeedFilterOptions;
  };
};

export interface IFeedPayload {
  title: string;
  categories: IFeedCategory[];
  filters: IAddFilterData;
}
