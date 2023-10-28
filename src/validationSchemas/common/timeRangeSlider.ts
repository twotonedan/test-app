import * as yup from 'yup';
import { i18n } from 'next-i18next';
import { HOURS_OF_DAY_OPTIONS_END, HOURS_OF_DAY_OPTIONS_START } from '@/constants';

export type TimeRangeSchema = {
  start: [number, number];
  end: [number, number];
};

const isValueBefore = (parent: TimeRangeSchema) => {
  const { start, end } = parent;
  if (
    start[0] === HOURS_OF_DAY_OPTIONS_START[0].value &&
    start[1] === HOURS_OF_DAY_OPTIONS_START[HOURS_OF_DAY_OPTIONS_START.length - 1].value &&
    end[0] === HOURS_OF_DAY_OPTIONS_END[0].value &&
    end[1] === HOURS_OF_DAY_OPTIONS_END[HOURS_OF_DAY_OPTIONS_END.length - 1].value
  )
    return true;
  if (start[1] < end[0]) return true;
  return false;
};

type Params = {
  nullable?: boolean;
  startRequired?: boolean;
  endRequired?: boolean;
  ensureNumber?: boolean;
};

export const timeRangeSliderSchema = ({ nullable = true }: Params = {}) =>
  yup.object().shape({
    start: yup
      .mixed()
      .test(value => {
        if (Array.isArray(value)) return true;
        return false;
      })
      // eslint-disable-next-line func-names
      .test(function (_, ctx) {
        if (
          Array.isArray(this.parent.start) &&
          this.parent.start.length === 0 &&
          Array.isArray(this.parent.end) &&
          this.parent.end.length === 0
        )
          return true;
        if (isValueBefore(this.parent)) return true;
        return ctx.createError({
          message: i18n?.t('common:form.time.startTimeAfterEndTime') || 'Start time must be before end time',
        });
      })
      .required(i18n?.t('common:form.time.startTimeRequired') || 'Start time is required')
      [nullable ? 'nullable' : 'nonNullable'](),
    end: yup
      .mixed()
      .when('start', ([start], schema) => {
        if (!start) return schema.notRequired();
        return (
          schema
            // eslint-disable-next-line func-names
            .test(function (_, ctx) {
              if (
                Array.isArray(this.parent.start) &&
                this.parent.start.length === 0 &&
                Array.isArray(this.parent.end) &&
                this.parent.end.length === 0
              )
                return true;
              if (isValueBefore(this.parent)) return true;
              return ctx.createError({
                message: i18n?.t('common:form.time.endTimeBeforeStartTime') || 'End time must be after start time',
              });
            })
            .required(i18n?.t('common:form.time.endTimeRequired') || 'End time is required')
        );
      })
      .required(i18n?.t('common:form.time.endTimeRequired') || 'End time is required')
      [nullable ? 'nullable' : 'nonNullable'](),
  });
