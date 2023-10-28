import * as yup from 'yup';

export interface IAddPaymentForm {
  checkAuthorize: boolean;
}

const AddPaymentFormSchema = yup
  .object()
  .shape({
    checkAuthorize: yup.bool().oneOf([true], 'Field must be checked').required(),
  })
  .nullable()
  .notRequired();

export default AddPaymentFormSchema;
