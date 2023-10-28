import * as yup from 'yup';
import 'yup-phone';

export interface AddRemoveGuestsForm {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

const addRemoveGuestsSchema = yup.object({
  fullName: yup.string().required(),
  emailAddress: yup.string().email().required(),
  // @ts-ignore-next-line
  phoneNumber: yup.string().phone('IN', true).required(),
});

export default addRemoveGuestsSchema;
