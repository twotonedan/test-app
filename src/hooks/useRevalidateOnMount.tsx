import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  getFreshValues: () => void;
  enabled?: boolean;
};

const useRevalidateOnMount = ({ name, getFreshValues, enabled = true }: Props) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (!enabled) return;
    setValue(name, getFreshValues(), { shouldValidate: true, shouldDirty: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useRevalidateOnMount;
