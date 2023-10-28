import { InputType } from '@/types/enums';
import * as yup from 'yup';
import {
  checkboxTypeValidation,
  dateTypeValidation,
  emailTypeValidation,
  numberTypeValidation,
  phoneTypeValidation,
  singleCheckTypeValidation,
  stringTypeValidation,
} from './validationsByType';

export type IDataGroup = {
  id: string;
  type: InputType;
  value: string | number | boolean | object | undefined;
};

export type IFormGroup = {
  data: IDataGroup[];
  id: string;
};

export type IFormValues = {
  formInformation: IFormGroup[];
};

const validateByType = {
  [InputType.STRING]: stringTypeValidation,
  [InputType.NUMBER]: numberTypeValidation,
  [InputType.DATE]: dateTypeValidation,
  [InputType.PHONE]: phoneTypeValidation,
  [InputType.EMAIL]: emailTypeValidation,
  [InputType.SELECT]: stringTypeValidation,
  [InputType.RADIO]: stringTypeValidation,
  [InputType.CHECKBOX]: checkboxTypeValidation,
  [InputType.SINGLECHECK]: singleCheckTypeValidation,
  [InputType.TIME]: dateTypeValidation,
};

const customerInfoGroupSchema = (mandatory: string[]) =>
  yup.lazy(() =>
    yup.object().shape({
      id: yup.string().required(),
      data: yup.array().of(
        yup.object().shape({
          type: yup.string().required(),
          id: yup.string().required(),
          value: yup
            .mixed()
            .when(
              ['type', 'id'],
              ([type, id]) => type && validateByType[type as InputType]({ isMandatory: mandatory.includes(id) })
            ),
        })
      ),
    })
  );

export default customerInfoGroupSchema;
