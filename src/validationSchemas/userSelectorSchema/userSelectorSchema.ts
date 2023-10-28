import { i18n } from 'next-i18next';
import * as yup from 'yup';
import 'yup-phone';

export interface UserSelectorForm {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

const userSelectorSchema = yup.object({
  fullName: yup.string().required(i18n?.t('common:userSelectorForm.fullName') || 'A name must be provided'),
  emailAddress: yup
    .string()
    .email()
    .required(i18n?.t('common:userSelectorForm.emailAddress') || 'An email must be provided.'),
  phoneNumber: yup
    .string()
    // @ts-ignore-next-line
    .phone(
      'IN',
      true,
      i18n?.t('common:userSelectorForm.phoneNumberProperForm') ||
        'Phone must be in either xxx-xxx-xxxx or xxxxxxxxxxx form.'
    )
    .required(i18n?.t('common:userSelectorForm.phoneNumberRequired') || 'A phone number must be provided'),
});

export default userSelectorSchema;
