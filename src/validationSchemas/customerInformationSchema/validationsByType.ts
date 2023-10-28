import * as yup from 'yup';
import { i18n } from 'next-i18next';

type SchemaType =
  | yup.StringSchema
  | yup.NumberSchema
  | yup.DateSchema
  | yup.ArraySchema<string[] | undefined, yup.AnyObject, undefined, ''>
  | yup.BooleanSchema<true | undefined, yup.AnyObject, '', ''>;

type IValidationsByType = {
  isMandatory: boolean;
};

interface IRequiredValidationSchema extends IValidationsByType {
  schemaType: SchemaType;
}

const createValidationSchema = ({ isMandatory, schemaType }: IRequiredValidationSchema) =>
  isMandatory
    ? schemaType.required(i18n?.t('common:customerInformationForm.requiredField') || 'This field is required.')
    : schemaType.nullable().notRequired();

export const stringTypeValidation = ({ isMandatory }: IValidationsByType) =>
  createValidationSchema({ isMandatory, schemaType: yup.string() });

export const dateTypeValidation = ({ isMandatory }: IValidationsByType) =>
  yup.lazy(v =>
    createValidationSchema({
      isMandatory,
      schemaType: v
        ? yup.date().typeError(i18n?.t('common:customerInformationForm.invalidDate') || 'Please enter a valid date.')
        : yup.string(),
    })
  );

export const numberTypeValidation = ({ isMandatory }: IValidationsByType) =>
  yup.lazy(v => createValidationSchema({ isMandatory, schemaType: v ? yup.number() : yup.string() }));

export const phoneTypeValidation = ({ isMandatory }: IValidationsByType) =>
  yup.lazy(v =>
    createValidationSchema({
      isMandatory,
      schemaType:
        // @ts-ignore-next-line
        v && !!yup.string()?.phone
          ? yup.string()
          : yup
              .string()
              // @ts-ignore-next-line
              .phone(
                'IN',
                true,
                i18n?.t('common:customerInformationForm.invalidPhone' || 'Please enter a valid phone number.')
              ),
    })
  );

export const emailTypeValidation = ({ isMandatory }: IValidationsByType) =>
  createValidationSchema({
    isMandatory,
    schemaType: yup
      .string()
      .email(i18n?.t('common:customerInformationForm.invalidEmail') || 'Please enter a valid email address.'),
  });

export const checkboxTypeValidation = ({ isMandatory }: IValidationsByType) =>
  createValidationSchema({
    isMandatory,
    schemaType: yup
      .array()
      .min(
        isMandatory ? 1 : 0,
        i18n?.t('common:customerInformationForm.invalidCheckbox') || 'Please select at least one option.'
      ),
  });

export const singleCheckTypeValidation = ({ isMandatory }: IValidationsByType) =>
  createValidationSchema({
    isMandatory,
    schemaType: isMandatory
      ? yup
          .boolean()
          .isTrue(i18n?.t('common:customerInformationForm.invalidSingleCheck') || 'Please check this box to continue.')
      : yup.string(),
  });
