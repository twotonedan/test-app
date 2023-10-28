import { CategoryType } from '@/types/enums';
import { Implements } from '@/types/utils';
import * as yup from 'yup';
import { IFeedFilterOptionsKeys } from '@/types/filters';

import dateRangeSchema, { DateRangeSchema } from '../common/dateRange';
import dateSchema from '../common/dateSchema';
import { FeedTimeRangeSchema, timeRangeSchemaNullable } from './timeRange';

export type FeedFilters = Implements<
  Partial<Record<IFeedFilterOptionsKeys, unknown>>,
  {
    isMultiDay: boolean;
    category?: CategoryType;
    date?: Date | number | null;
    dateRange?: DateRangeSchema;
    timeRange?: FeedTimeRangeSchema;
    priceRange?: [number, number];
    amenities?: { value: number }[];
    locations?: { value: string }[];
  }
>;

export interface IFeedSchema {
  filters?: FeedFilters;
}

const feedFiltersSchema = yup
  .object()
  .shape({
    filters: yup
      .object()
      .shape({
        category: yup.string().notRequired(),
        isMultiDay: yup.boolean().required(),
        date: dateSchema,
        dateRange: dateRangeSchema(),
        timeRange: timeRangeSchemaNullable,
        locations: yup.array().of(yup.object().shape({ value: yup.string() })),
      })
      .notRequired(),
  })
  .nullable()
  .notRequired();

export default feedFiltersSchema;
