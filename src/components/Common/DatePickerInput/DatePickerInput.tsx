import useInputError from '@/hooks/useInputError';
import { ControllersProps } from '@/types';
import { TextFieldProps } from '@mui/material';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { noop } from 'lodash';
import { useCallback, useState } from 'react';
import { ControllerRenderProps, FieldValues, useController, useFormContext } from 'react-hook-form';
import handleInputRef from '@/utils/handleInputRef';

import Input from '../Input/Input';

export type DatePickerInputProps = Omit<
  DesktopDatePickerProps<TextFieldProps, Date>,
  'renderInput' | 'onChange' | 'value'
> &
  ControllersProps & {
    name: string;
    renderInputProps?: TextFieldProps;
    value?: unknown;
    onChange?: (v: Date | null, field: ControllerRenderProps<FieldValues, string>) => void;
    validateFields?: string | string[];
    isRequired?: boolean;
  };

const DatePickerInput = ({
  name,
  controllerProps,
  renderInputProps,
  onChange,
  validateFields,
  ...props
}: DatePickerInputProps) => {
  const [keepInputFocused, setKeepInputFocused] = useState(false);
  const { control, trigger } = useFormContext();
  const { field } = useController({ name, control, ...controllerProps, defaultValue: null });
  const error = useInputError(name);
  const value = props.value || field.value;

  const handleOnChange = useCallback(
    (v: Date | null) => {
      if (onChange) onChange?.(v, field);
      else field.onChange(v);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields]
  );

  return (
    <DesktopDatePicker
      {...props}
      value={value}
      onChange={handleOnChange}
      onClose={() => setKeepInputFocused(false)}
      onOpen={() => setKeepInputFocused(true)}
      renderInput={({ ref, inputProps, ...params }) => {
        return (
          <Input
            {...params}
            {...renderInputProps}
            {...field}
            inputProps={{ ...inputProps }}
            error={!!error || params.error}
            helperText={error || params.helperText}
            onChange={noop}
            keepInputFocused={keepInputFocused}
            fullWidth
            isRequired={props.isRequired}
            ref={null}
            inputRef={_ref => handleInputRef(_ref, field)}
          />
        );
      }}
    />
  );
};

export default DatePickerInput;
