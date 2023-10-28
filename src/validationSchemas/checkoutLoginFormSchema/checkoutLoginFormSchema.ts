import * as yup from 'yup';
import { i18n } from 'next-i18next';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginFormSchema {
  loginData: ILoginForm;
}

const loginFormSchema = yup
  .object()
  .shape({
    loginData: yup
      .object()
      .shape({
        email: yup
          .string()
          .email(i18n?.t('common:form.format.email') || 'Please enter a valid email address')
          .required(i18n?.t('common:form.required.email') || 'Email is required'),
        password: yup
          .string()
          .required(i18n?.t('common:form.required.password') || 'Password is required')
          .min(5, i18n?.t('common:form.format.passwordMin') || 'Password must be at least 5 characters')
          .max(8, i18n?.t('common:form.format.passwordMax') || 'Password must be less than 20 characters'),
      })
      .required(),
  })
  .nullable()
  .notRequired();

export default loginFormSchema;
