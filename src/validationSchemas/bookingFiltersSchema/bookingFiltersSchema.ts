import { Implements } from '@/types/utils';
import * as yup from 'yup';
import { IBookingFilterOptionsKeys } from '@/types/filters';

import dateRangeSchema, { DateRangeSchema } from '../common/dateRange';
import dateSchema from '../common/dateSchema';

export type BookingFilters = Implements<
  Partial<Record<IBookingFilterOptionsKeys, unknown>>,
  {
    isMultiDay: boolean;
    date?: Date | number | null;
    dateRange?: DateRangeSchema;
    status?: string;
    unit?: string;
  }
>;

export interface IBookingSchema {
  bookingFilters?: BookingFilters;
}

const bookingFiltersSchema = yup
  .object()
  .shape({
    bookingFilters: yup
      .object()
      .shape({
        isMultiDay: yup.boolean().required(),
        date: dateSchema,
        dateRange: dateRangeSchema(),
        status: yup.string().notRequired(),
        unit: yup.string().notRequired(),
      })
      .notRequired(),
  })
  .nullable()
  .notRequired();

export default bookingFiltersSchema;
