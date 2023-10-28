import { StaticImageData } from 'next/image';

export interface IDateRangeCalendarInfo {
  [dateIsoString: string]: {
    price?: number;
    isHoliday?: boolean;
    isUnavailable?: boolean;
  };
}

export interface IDateRange {
  start: Date;
  end: Date;
}

export interface IImage {
  src: StaticImageData;
  alt: string;
  id: number;
}

export interface IQuantityLimits {
  min: number;
  max: number;
}
