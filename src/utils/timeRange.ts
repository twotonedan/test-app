import type { TimeRangeSchemaCustomRange } from '@/validationSchemas/common/timeRange';
import { TimeRangeSchema } from '@/validationSchemas/common/timeRangeSlider';
import { isNaN, isNil } from 'lodash';

const isNilOrEmpty = (value: unknown) => isNil(value) || value === '';

export const getStartEndHour = ({ start, end }: TimeRangeSchemaCustomRange) => {
  const startHour = !isNilOrEmpty(start) ? Number(start) : null;
  const endHour = !isNilOrEmpty(end) ? Number(end) : null;

  return {
    startHour: !isNaN(startHour) ? startHour : null,
    endHour: !isNaN(endHour) ? endHour : null,
  };
};

export const getStartEndRange = ({ start, end }: TimeRangeSchema) => {
  const startHour = Array.isArray(start) ? start : null;
  const endHour = Array.isArray(end) ? end : null;

  return {
    startHour,
    endHour,
  };
};
