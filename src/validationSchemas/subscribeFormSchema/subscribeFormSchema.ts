import * as yup from 'yup';
import { i18n } from 'next-i18next';

export interface ISubscribeForm {
  email: string;
}

const subscribeFormSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email(i18n?.t('common:form.format.email') || 'Please enter a valid email address')
      .required(i18n?.t('common:form.required.email') || 'Email is required'),
  })
  .nullable()
  .notRequired();

export default subscribeFormSchema;
