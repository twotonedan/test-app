import { isNil, isNull, isNumber, isString } from 'lodash';
import * as yup from 'yup';

export const emptyStringToNull = (_: yup.AnyObjectSchema, value: string) => (value === '' ? null : value);
export const transformToNumber = (value: string | number | null) => {
  if (isNil(value)) return null;
  return Number(value);
};

export const dropdownSchema = yup
  .mixed()
  .test(value => {
    if (isNumber(value) || isString(value) || isNull(value)) return true;
    return false;
  })
  .transform(emptyStringToNull);
