import { addDays, addMonths, endOfMonth, isValid, startOfMonth, startOfToday } from 'date-fns';
import * as yup from 'yup';
import { i18n } from 'next-i18next';

export type DateRangeSchema = { start: Date | number | null; end: Date | number | null };

const baseDate = startOfToday();

type Params = {
  startRequired?: boolean;
  endRequired?: boolean;
  nullable?: boolean;
};

const dateRangeSchema = ({ startRequired = false, endRequired = false, nullable = true }: Params = {}) =>
  yup.object().when('isMultiDay', {
    is: (v: boolean) => v === true,
    then: s =>
      s.shape(
        {
          start: yup
            .date()
            .typeError(i18n?.t('common:form.date.startDateValid') || 'Start date is not valid')
            .min(baseDate, i18n?.t('common:form.date.startDateAfterToday') || 'Start date must be today or later')
            .max(
              yup.ref('end'),
              i18n?.t('common:form.date.startDateBeforeEndDate') || 'Start date must be before end date'
            )
            .when('end', ([end], schema) => {
              if (end)
                return schema.required(i18n?.t('common:form.date.startDateRequired') || 'Start date is required');
              return schema;
            })
            [startRequired ? 'required' : 'notRequired'](
              i18n?.t('common:form.date.startDateRequired') || 'Start date is required'
            )
            [nullable ? 'nullable' : 'nonNullable'](),
          end: yup
            .date()
            .typeError(i18n?.t('common:form.date.endDateValid') || 'End date is not valid')
            .when('start', ([start], schema) => {
              if (isValid(start))
                return schema
                  .required(i18n?.t('common:form.date.endDateRequired') || 'End date is required')
                  .min(
                    addDays(start as unknown as Date, 1),
                    i18n?.t('common:form.date.endDateAfterStartDate') || 'End date must be today or later'
                  );
              return schema;
            })
            .max(
              endOfMonth(addMonths(startOfMonth(baseDate), 11)),
              i18n?.t('common:form.date.endDateWithinElevenMonths') || 'End date must be within the next 11 months'
            )
            [endRequired ? 'required' : 'notRequired'](
              i18n?.t('common:form.date.endDateRequired') || 'End date is required'
            )
            [nullable ? 'nullable' : 'nonNullable'](),
        },
        [['start', 'end']]
      ),
    otherwise: s => s.notRequired(),
  });

export default dateRangeSchema;
