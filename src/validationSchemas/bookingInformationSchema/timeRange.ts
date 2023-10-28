import * as yup from 'yup';
import { BookingInformationType } from '@/types/enums';
import { dropdownSchema, transformToNumber } from '../common/common';
import { timeRangeCustomRangeSchema, TimeRangeSchemaCustomRange } from '../common/timeRange';

export type BookingTimeRangeSchemaDuration = {
  duration: number | null;
  range: TimeRangeSchemaCustomRange;
};

export type BookingTimeRangeSchema =
  | { type: BookingInformationType.DURATION; value: BookingTimeRangeSchemaDuration }
  | {
      type: BookingInformationType.CUSTOM_RANGE | BookingInformationType.PREDEFINED;
      value: TimeRangeSchemaCustomRange;
    };

const timeRangeCustomSchema = timeRangeCustomRangeSchema({
  startRequired: true,
  endRequired: true,
  nullable: false,
  ensureNumber: true,
});

const durationSchema = yup.object().shape({
  duration: dropdownSchema.transform(transformToNumber).nullable(),
  range: timeRangeCustomSchema,
});

const timeRangeSchema = yup
  .object()
  .shape({
    type: yup.string().oneOf(Object.values(BookingInformationType)).required(),
    value: yup
      .mixed()
      .when('type', ([type]) =>
        yup.lazy(() => {
          if ([BookingInformationType.CUSTOM_RANGE, BookingInformationType.PREDEFINED].includes(type)) {
            return timeRangeCustomSchema;
          }
          if (type === BookingInformationType.DURATION) return durationSchema;
          return yup.mixed().notRequired();
        })
      )
      .required(),
  })
  .notRequired();

export default timeRangeSchema;
