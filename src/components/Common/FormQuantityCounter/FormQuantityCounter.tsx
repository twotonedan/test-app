import { ControllersProps } from '@/types';
import { IQuantityLimits } from '@/types/common';
import { useController, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';

import QuantityCounter from '../QuantityCounter';

type Props = {
  name: string;
  limits: IQuantityLimits;
  onTrashClick?: () => void;
  className?: string;
  disableSubstract?: boolean;
  hideTrash?: boolean;
  sizeSmall?: boolean;
  validateFields?: string | string[];
} & ControllersProps;

const FormQuantityCounter = ({
  name,
  limits,
  controllerProps,
  onTrashClick,
  className,
  disableSubstract,
  hideTrash,
  sizeSmall,
  validateFields,
}: Props) => {
  const defaultValue = limits.min;

  const { control, trigger } = useFormContext();
  const { field } = useController({ defaultValue, name, control, ...controllerProps });

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      field.onChange(newQuantity);
      if (validateFields) trigger(validateFields);
    },
    [field, trigger, validateFields]
  );

  const handleAdd = (q: number) => {
    handleQuantityChange(q + 1);
  };

  const handleRemove = (q: number) => {
    handleQuantityChange(q - 1);
  };

  const handleTrash = () => {
    handleQuantityChange(0);
    onTrashClick?.();
  };

  return (
    <QuantityCounter
      className={className}
      limits={limits}
      quantity={field.value}
      disableSubstract={disableSubstract}
      hideTrash={hideTrash}
      sizeSmall={sizeSmall}
      handleAddClick={handleAdd}
      handleRemoveClick={handleRemove}
      handleTrashClick={handleTrash}
    />
  );
};

export default FormQuantityCounter;
