import * as yup from 'yup';

export interface ITACForm {
  checkTAC: boolean;
  checkOthers: boolean;
}

const TACFormSchema = yup
  .object()
  .shape({
    checkTAC: yup.bool().oneOf([true], 'Field must be checked').required(),
    checkOthers: yup.bool().oneOf([true], 'Field must be checked').required(),
  })
  .nullable()
  .notRequired();

export default TACFormSchema;
