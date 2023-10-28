import * as yup from 'yup';

export interface IPersonalDataForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  driversLicense: string;
}

export interface IPersonalDataFormSchema {
  personalData: IPersonalDataForm;
}

const personalDataFormSchema = yup
  .object()
  .shape({
    personalData: yup
      .object()
      .shape({
        email: yup.string().email().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phoneNumber: yup.number().required(),
        birthDate: yup.number().required(),
        driversLicense: yup.string().required(),
      })
      .required(),
  })
  .nullable()
  .notRequired();

export default personalDataFormSchema;
