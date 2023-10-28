import * as yup from 'yup';
import { getStartEndHour } from '@/utils/timeRange';
import { isNil } from 'lodash';
import { i18n } from 'next-i18next';

import { dropdownSchema, transformToNumber } from './common';

export type TimeRangeSchemaCustomRange = { start: string | number | null; end: string | number | null };

const isValueBefore = (parent: TimeRangeSchemaCustomRange) => {
  const { startHour, endHour } = getStartEndHour(parent);

  if (!isNil(startHour) && !isNil(endHour) && startHour < endHour) return true;
  return false;
};

type Params = {
  nullable?: boolean;
  startRequired?: boolean;
  endRequired?: boolean;
  ensureNumber?: boolean;
};

export const timeRangeCustomRangeSchema = ({
  startRequired = false,
  endRequired = false,
  nullable = true,
  ensureNumber = false,
}: Params = {}) =>
  yup.object().shape({
    start: dropdownSchema
      // eslint-disable-next-line func-names
      .test(function (_, ctx) {
        if (isNil(this.parent.start) || isNil(this.parent.end)) return true;
        if (isValueBefore(this.parent)) return true;
        return ctx.createError({
          message: i18n?.t('common:form.time.startTimeAfterEndTime') || 'Start time must be before end time',
        });
      })
      .transform(v => (ensureNumber ? transformToNumber(v) : v))
      [startRequired ? 'required' : 'notRequired'](
        i18n?.t('common:form.time.startTimeRequired') || 'Start time is required'
      )
      [nullable ? 'nullable' : 'nonNullable'](),
    end: dropdownSchema
      .when('start', ([start], schema) => {
        if (!start) return schema.notRequired();
        return (
          schema
            // eslint-disable-next-line func-names
            .test(function (_, ctx) {
              if (isNil(this.parent.start) && isNil(this.parent.end)) return true;
              if (isValueBefore(this.parent)) return true;
              return ctx.createError({
                message: i18n?.t('common:form.time.endTimeBeforeStartTime') || 'End time must be after start time',
              });
            })
            // eslint-disable-next-line func-names
            .test(function (_, ctx) {
              if (!isNil(this.parent.start) && isNil(this.parent.end))
                return ctx.createError({
                  message: i18n?.t('common:form.time.endTimeRequired') || 'End time is required',
                });
              return true;
            })
        );
      })
      .transform(v => (ensureNumber ? transformToNumber(v) : v))
      [endRequired ? 'required' : 'notRequired'](i18n?.t('common:form.time.endTimeRequired') || 'End time is required')
      [nullable ? 'nullable' : 'nonNullable'](),
  });
