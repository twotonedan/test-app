import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  onValid?: () => void;
  onNoValid?: () => void;
};

const useValidateField = ({ name, onValid, onNoValid }: Props) => {
  const { trigger } = useFormContext();

  return useCallback(async () => {
    const isValid = await trigger(name);
    if (!isValid) {
      onNoValid?.();
      return;
    }
    onValid?.();
  }, [name, onValid, onNoValid, trigger]);
};

export default useValidateField;
