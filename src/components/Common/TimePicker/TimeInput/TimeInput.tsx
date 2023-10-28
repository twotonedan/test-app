import useInputError from '@/hooks/useInputError';
import { ControllersProps } from '@/types';
import { TextFieldProps } from '@mui/material';
import { DesktopTimePicker, DesktopTimePickerProps } from '@mui/x-date-pickers';
import { useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { noop } from 'lodash';
import handleInputRef from '@/utils/handleInputRef';
import Input from '../../Input/Input';

type Props = Omit<DesktopTimePickerProps<TextFieldProps, Date>, 'renderInput' | 'onChange' | 'value'> &
  ControllersProps & {
    name: string;
    renderInputProps?: TextFieldProps;
    value?: unknown;
    onChange?: (v: Date | null) => void;
    validateFields?: string | string[];
    isRequired?: boolean;
  };

const TimeInput = ({ controllerProps, onChange, name, validateFields, renderInputProps, ...props }: Props) => {
  const { control, trigger } = useFormContext();
  const { field } = useController({ name, control, ...controllerProps, defaultValue: null });
  const error = useInputError(name);
  const [keepInputFocused, setKeepInputFocused] = useState(false);
  const value = props.value || field.value;

  const handleOnChange = useCallback(
    (v: Date | null) => {
      if (onChange) onChange?.(v);
      else field.onChange(v);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields]
  );

  return (
    <DesktopTimePicker
      {...props}
      value={value}
      onChange={handleOnChange}
      onClose={() => setKeepInputFocused(false)}
      onOpen={() => setKeepInputFocused(true)}
      renderInput={({ ref, ...params }) => {
        return (
          <Input
            {...params}
            {...renderInputProps}
            {...field}
            error={!!error || params.error}
            helperText={error || params.helperText}
            onChange={noop}
            keepInputFocused={keepInputFocused}
            fullWidth
            isRequired={props.isRequired}
            ref={null}
            inputRef={_ref => handleInputRef(_ref as HTMLElement, field)}
          />
        );
      }}
    />
  );
};

export default TimeInput;
