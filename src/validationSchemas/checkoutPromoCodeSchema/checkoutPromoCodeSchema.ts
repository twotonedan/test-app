import * as yup from 'yup';

export interface IPromoCodeForm {
  code: string;
}

const promoFormSchema = yup
  .object()
  .shape({
    code: yup.string().min(5).max(8),
  })
  .nullable()
  .notRequired();

export default promoFormSchema;
