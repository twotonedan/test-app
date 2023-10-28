import useInputError from '@/hooks/useInputError';
import { ControllersProps } from '@/types';
import { FormHelperText, Slider, SliderProps } from '@mui/material';
import { useCallback } from 'react';
import { ControllerRenderProps, FieldValues, useController, useFormContext } from 'react-hook-form';

type Props = Omit<SliderProps, 'onChange'> & {
  name: string;
  step: number;
  onChange?: (value: number | number[], field: ControllerRenderProps<FieldValues, string>) => void;
  validateFields?: string | string[];
  helperText?: string;
} & ControllersProps;

const SliderRange = ({ name, defaultValue = [], controllerProps, onChange, validateFields, ...props }: Props) => {
  const { control, trigger } = useFormContext();
  const { field } = useController({ name, control, ...controllerProps, defaultValue });
  const error = useInputError(name);

  const handleOnChange = useCallback(
    (e: Event, value: number | number[]) => {
      if (onChange) onChange?.(value, field);
      else field.onChange(value);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields]
  );

  const helperText = error || props.helperText;

  return (
    <>
      <Slider {...field} {...props} onChange={handleOnChange} />
      {helperText && <FormHelperText error>{error || props.helperText}</FormHelperText>}
    </>
  );
};

export default SliderRange;
