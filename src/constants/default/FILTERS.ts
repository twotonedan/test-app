import { BookingInformationType } from '@/types/enums';
import { IFilterDefaults } from '@/types/filters';
import { BookingTimeRangeSchema } from '@/validationSchemas/bookingInformationSchema/timeRange';

export const DEFAULT_DATE_SELECTED_RANGE: { start: number | Date | null; end: number | Date | null } = {
  start: null,
  end: null,
};

export const DEFAULT_TIME_SELECTED_RANGE: { start: string | null; end: string | null } = {
  start: null,
  end: null,
};

export const DEFAULT_PRICE_RANGE: [number, number] = [0, 100];

export const DEFAULT_FILTER_STATE: IFilterDefaults = {
  isMultiDay: false,
  showUnavailable: false,
};

export const DEFAULT_TIME_RANGE_VALUES: {
  [k in BookingInformationType]: BookingTimeRangeSchema;
} = {
  [BookingInformationType.CUSTOM_RANGE]: {
    type: BookingInformationType.CUSTOM_RANGE,
    value: DEFAULT_TIME_SELECTED_RANGE,
  },
  [BookingInformationType.DURATION]: {
    type: BookingInformationType.DURATION,
    value: { duration: null, range: DEFAULT_TIME_SELECTED_RANGE },
  },
  [BookingInformationType.PREDEFINED]: {
    type: BookingInformationType.PREDEFINED,
    value: DEFAULT_TIME_SELECTED_RANGE,
  },
};
