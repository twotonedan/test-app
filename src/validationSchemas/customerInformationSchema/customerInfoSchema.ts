import * as yup from 'yup';

const customerInfoSchema = yup.lazy(() =>
  yup.object().shape({
    formInformation: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        data: yup.array().min(1).required(),
      })
    ),
  })
);

export default customerInfoSchema;
