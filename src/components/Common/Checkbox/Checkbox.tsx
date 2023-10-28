import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { ControllerRenderProps, FieldValues, useController, useFormContext } from 'react-hook-form';
import { ControllersProps } from '@/types';
import { ChangeEvent, ReactNode, memo, useCallback, useState } from 'react';
import handleInputRef from '@/utils/handleInputRef';

type Props = {
  label: ReactNode | string;
  disabled?: boolean;
  name: string;
  validateFields?: string | string[];
  onChange?: (checked: boolean, field: ControllerRenderProps<FieldValues, string>) => void;
  isFirstCheckbox?: boolean;
} & ControllersProps &
  CheckboxProps;

const CheckboxComponent = ({
  validateFields,
  onChange,
  controllerProps,
  label,
  disabled,
  name,
  className,
  defaultValue,
  defaultChecked,
  isFirstCheckbox,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false);
  const { control, trigger } = useFormContext();
  const { field } = useController({
    name,
    control,
    ...controllerProps,
    defaultValue: defaultValue ?? defaultChecked,
  });

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (onChange) onChange?.(checked, field);
      else field.onChange(checked);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields]
  );

  return (
    <FormControlLabel
      disabled={disabled}
      label={label}
      className={className}
      ref={_ref => handleInputRef(_ref as HTMLElement, field)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => setFocused(false)}
      control={
        <Checkbox
          {...field}
          {...props}
          className={focused ? 'focused' : ''}
          onChange={handleOnChange}
          checked={!!(props.checked ?? field.value)}
        />
      }
    />
  );
};

export default memo(CheckboxComponent);
