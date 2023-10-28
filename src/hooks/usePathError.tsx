import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
};

const usePathError = ({ name }: Props) => {
  const { getFieldState, formState } = useFormContext();
  return getFieldState(name, formState).error;
};

export default usePathError;
