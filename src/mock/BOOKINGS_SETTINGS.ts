import { IBookingSupportedFilterKeys } from '@/types/filters';
import { IBookingFilterData } from '@/types/bookings';

export type IBookingsSettings = {
  filters: IBookingFilterData;
};

export const BOOKINGS_SETTINGS: IBookingsSettings = {
  filters: {
    settings: {
      filtersToShow: [
        IBookingSupportedFilterKeys.dateOrDateRange,
        IBookingSupportedFilterKeys.status,
        IBookingSupportedFilterKeys.unit,
      ],
    },
    options: {
      status: [
        { label: 'Active', id: 1 },
        { label: 'Cancelled', id: 2 },
        { label: 'Cancellation Requested', id: 3 },
      ],
      unit: [
        { label: 'Ski Boat', id: 1 },
        { label: 'Ski Boat 2', id: 2 },
      ],
    },
  },
};
