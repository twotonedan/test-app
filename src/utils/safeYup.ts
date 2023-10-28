import { Schema } from 'yup';

export const safeCast = <T extends object, S extends Schema>(data: T, schema: S): [S['__outputType'], boolean] => {
  try {
    const castedData = schema.cast(data, { stripUnknown: true });
    return [castedData, false];
  } catch (e) {
    return [{}, true];
  }
};

export const safeValidate = <T extends object, S extends Schema>(data: T, schema: S): [S['__outputType'], boolean] => {
  try {
    const validatedData = schema.validateSync(data, { stripUnknown: true });
    return [validatedData, false];
  } catch (e) {
    return [{}, true];
  }
};

export const safeIsValidSync = <T extends object, S extends Schema>(data: T, schema: S): data is S['__outputType'] => {
  try {
    return schema.isValidSync(data, { stripUnknown: true });
  } catch (e) {
    return false;
  }
};
