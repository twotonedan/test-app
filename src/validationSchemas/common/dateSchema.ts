import { startOfToday, endOfMonth, addMonths, startOfMonth } from 'date-fns';
import * as yup from 'yup';
import { i18n } from 'next-i18next';

const baseDate = startOfToday();

const dateSchema = yup
  .date()
  .typeError(i18n?.t('common:form.format.date') || 'Please enter a valid date')
  .min(baseDate, i18n?.t('common:form.date.startDateAfterToday') || 'Start date must be today or later')
  .max(
    endOfMonth(addMonths(startOfMonth(baseDate), 11)),
    i18n?.t('common:form.date.singleDateWithinElevenMonths') || 'Date must be within 11 months from today'
  )
  .notRequired();

export default dateSchema;
