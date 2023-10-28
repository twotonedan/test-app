import { BookingInformationType } from '@/types/enums';
import { toUTC } from '@/utils/timezone';
import { set } from 'date-fns';

/* This will be an example payload that will return the api, when is sended the selected date and a booking type */
export const BOOKING_INFORMATION_DURATION = {
  options: [
    { label: '2 hours', value: 2 },
    { label: '4 hours', value: 4 },
    { label: '6 hours', value: 6 },
    { label: '8 hours', value: 8 },
  ],
};

const baseDate = toUTC(new Date());

export const BOOKING_INFORMATION_RENTAL_RANGE: {
  [k: number]: { label: string; value: { start: number; end: number } }[];
} = {
  2: [
    {
      label: '02:00 - 04:00',
      value: {
        start: set(baseDate, { hours: 2 }).getHours(),
        end: set(baseDate, { hours: 4 }).getHours(),
      },
    },
    {
      label: '04:00 - 06:00',
      value: {
        start: set(baseDate, { hours: 4 }).getHours(),
        end: set(baseDate, { hours: 6 }).getHours(),
      },
    },
    {
      label: '06:00 - 08:00',
      value: {
        start: set(baseDate, { hours: 6 }).getHours(),
        end: set(baseDate, { hours: 8 }).getHours(),
      },
    },
    {
      label: '08:00 - 10:00',
      value: {
        start: set(baseDate, { hours: 8 }).getHours(),
        end: set(baseDate, { hours: 10 }).getHours(),
      },
    },
  ],
  4: [
    {
      label: '02:00 - 06:00',
      value: {
        start: set(baseDate, { hours: 2 }).getHours(),
        end: set(baseDate, { hours: 6 }).getHours(),
      },
    },
    {
      label: '03:00 - 07:00',
      value: {
        start: set(baseDate, { hours: 3 }).getHours(),
        end: set(baseDate, { hours: 7 }).getHours(),
      },
    },
    {
      label: '04:00 - 08:00',
      value: {
        start: set(baseDate, { hours: 4 }).getHours(),
        end: set(baseDate, { hours: 8 }).getHours(),
      },
    },
  ],
  6: [
    {
      label: '02:00 - 08:00',
      value: {
        start: set(baseDate, { hours: 2 }).getHours(),
        end: set(baseDate, { hours: 8 }).getHours(),
      },
    },
    {
      label: '04:00 - 10:00',
      value: {
        start: set(baseDate, { hours: 4 }).getHours(),
        end: set(baseDate, { hours: 10 }).getHours(),
      },
    },
  ],
  8: [
    {
      label: '02:00 - 10:00',
      value: {
        start: set(baseDate, { hours: 2 }).getHours(),
        end: set(baseDate, { hours: 10 }).getHours(),
      },
    },
    {
      label: '04:00 - 12:00',
      value: {
        start: set(baseDate, { hours: 4 }).getHours(),
        end: set(baseDate, { hours: 12 }).getHours(),
      },
    },
  ],
};

export const BOOKING_INFORMATION_PREDEFINED_TIMERANGE = BOOKING_INFORMATION_RENTAL_RANGE[2];

export const BOOKING_INFORMATION_CUSTOM_PICKUP = [
  {
    label: '01:00',
    value: 1,
  },
  {
    label: '02:00',
    value: 2,
  },
  {
    label: '03:00',
    value: 3,
  },
  {
    label: '06:00',
    value: 6,
  },
];

export const BOOKING_INFORMATION_CUSTOM_DROPOFF = [
  {
    label: '02:00',
    value: 2,
  },
  {
    label: '04:00',
    value: 4,
  },
  {
    label: '05:00',
    value: 5,
  },
  {
    label: '08:00',
    value: 8,
  },
];

export type BookingInformation = {
  [BookingInformationType.DURATION]: {
    type: BookingInformationType.DURATION;
    options: { label: string; value: number }[];
  };
  [BookingInformationType.CUSTOM_RANGE]: {
    type: BookingInformationType.CUSTOM_RANGE;
    startOptions: { label: string; value: number }[];
    endOptions: { label: string; value: number }[];
  };
  [BookingInformationType.PREDEFINED]: {
    type: BookingInformationType.PREDEFINED;
    options: { label: string; value: { start: number; end: number } }[];
  };
};

export const BOOKING_INFORMATION: BookingInformation = {
  [BookingInformationType.DURATION]: {
    type: BookingInformationType.DURATION,
    options: BOOKING_INFORMATION_DURATION.options,
  },
  [BookingInformationType.CUSTOM_RANGE]: {
    type: BookingInformationType.CUSTOM_RANGE,
    startOptions: BOOKING_INFORMATION_CUSTOM_PICKUP,
    endOptions: BOOKING_INFORMATION_CUSTOM_DROPOFF,
  },
  [BookingInformationType.PREDEFINED]: {
    type: BookingInformationType.PREDEFINED,
    options: BOOKING_INFORMATION_PREDEFINED_TIMERANGE,
  },
};
