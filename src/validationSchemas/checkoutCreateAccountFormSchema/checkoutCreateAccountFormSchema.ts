import * as yup from 'yup';

export interface ICreateAccountFormSchema {
  password: string;
}

const createAccountFormSchema = yup
  .object()
  .shape({
    password: yup.string().required().min(5).max(8),
  })
  .nullable()
  .notRequired();

export default createAccountFormSchema;
