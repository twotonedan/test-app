import * as yup from 'yup';
import 'yup-phone';
import { i18n } from 'next-i18next';

import { IBookingInformation } from '../bookingInformationSchema/bookingInformationSchema';
import dateSchema from '../common/dateSchema';
import dateRangeSchema from '../common/dateRange';
import timeRangeSchema from '../bookingInformationSchema/timeRange';

export interface IJoinWaitlistForm {
  bookingInformation: IBookingInformation;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const joinWaitlistFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(i18n?.t('common:form.format.email') || 'Please enter a valid email address')
    .required(i18n?.t('common:form.required.email') || 'Email is required'),
  firstName: yup
    .string()
    .required(i18n?.t('common:form.required.firstName') || 'First name is required')
    .max(50),
  lastName: yup
    .string()
    .required(i18n?.t('common:form.required.lastName') || 'Last name is required')
    .min(1)
    .max(50),
  // @ts-ignore-next-line
  phoneNumber: yup.string().phone
    ? yup
        .string()
        // @ts-ignore-next-line
        ?.phone('IN', true, i18n?.t('common:form.format.phoneNumber') || 'Please enter a valid phone number')
        .required(i18n?.t('common:form.required.phoneNumber') || 'Phone number is required')
    : yup.string().required(i18n?.t('common:form.required.phoneNumber') || 'Phone number is required'),
  bookingInformation: yup.object().shape({
    isMultiDay: yup.boolean().required(),
    date: dateSchema.when('isMultiDay', {
      is: false,
      then: () => dateSchema.required(),
      otherwise: () => dateSchema.nullable(),
    }),
    dateRange: dateRangeSchema({ startRequired: true, endRequired: true, nullable: false }),
    timeRange: timeRangeSchema,
  }),
});

export default joinWaitlistFormSchema;
