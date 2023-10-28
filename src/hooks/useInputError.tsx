import { useFormContext, get } from 'react-hook-form';

const useInputError = (name: string): string => {
  const { formState } = useFormContext();
  return get(formState.errors, `${name}.message`, '');
};

export default useInputError;
