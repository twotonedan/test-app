import * as yup from 'yup';

export interface IPoliciesForm {
  checkPolicies: boolean;
  checkOthers: boolean;
}

const policiesSchema = yup
  .object()
  .shape({
    signature: yup.string().test('signature', 'Please sign where indicated', (value, context) => {
      let signedAllInputs = true;
      Object.keys(context.parent).forEach((key: string) => {
        if (key.includes('%your_') && context.parent[key] === '') {
          signedAllInputs = false;
        }
      });
      return signedAllInputs;
    }),
    checkPolicies: yup.bool().oneOf([true], 'Field must be checked').required(),
    checkOthers: yup.bool().oneOf([true], 'Field must be checked').required(),
  })
  .nullable()
  .notRequired();

export default policiesSchema;
