import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = {
  name: string;
  type: unknown;
};

const useSetType = ({ name, type }: Props) => {
  const { setValue } = useFormContext();
  const mainData = useWatch({ name });

  useEffect(() => {
    if (!mainData || mainData.type === type) return;
    setValue(`${name}.type`, type);
  }, [name, setValue, type, mainData]);
};

export default useSetType;
