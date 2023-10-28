import * as yup from 'yup';
import { IDateRange } from '@/types/common';
import dateRangeSchema, { DateRangeSchema } from '../common/dateRange';
import timeRangeSchema, { BookingTimeRangeSchema } from './timeRange';

export interface IBookingInformation {
  isMultiDay: boolean;
  quantity: number;
  date?: Date | null;
  dateRange?: DateRangeSchema;
  timeRange?: BookingTimeRangeSchema;
}

export interface IBookingInformationSchema {
  bookingInformation: IBookingInformation;
}

const bookingInformationSchema = yup
  .object()
  .shape({
    bookingInformation: yup
      .object()
      .shape({
        isMultiDay: yup.boolean().required(),
        quantity: yup.number().required(),
        date: yup.date().notRequired(),
        dateRange: dateRangeSchema(),
        timeRange: timeRangeSchema,
      })
      .required(),
  })
  .nullable()
  .notRequired()
  .test('check-dates', 'Either date or dateRange is required', value => {
    if (value) {
      const { date, dateRange } = value.bookingInformation;
      const fullDateRange = dateRange as IDateRange;
      return !!date || (!!fullDateRange?.start && !!fullDateRange?.end);
    }
    return false;
  });

export default bookingInformationSchema;
