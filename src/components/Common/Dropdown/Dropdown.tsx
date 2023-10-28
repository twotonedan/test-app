import useInputError from '@/hooks/useInputError';
import { ControllersProps } from '@/types';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps, styled } from '@mui/material';
import { isEqual, isObjectLike } from 'lodash';
import { memo, useCallback } from 'react';
import { ControllerRenderProps, FieldValues, useController, useFormContext } from 'react-hook-form';
import handleInputRef from '@/utils/handleInputRef';
import InputHelper from '../InputHelper';

const StyledKeyboardArrowDownOutlined = styled(KeyboardArrowDownOutlined)`
  transition: transform 0.1s;
`;

type Props = Omit<SelectProps, 'onChange'> & {
  label: string;
  name: string;
  error?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { label: string; value: any }[];
  labelId: string;
  validateFields?: string | string[];
  onChange?: (e: SelectChangeEvent, field: ControllerRenderProps<FieldValues, string>) => void;
  helperText?: string;
  isRequired?: boolean;
} & ControllersProps;

const Dropdown = ({
  labelId,
  options,
  controllerProps,
  name,
  label,
  onChange,
  validateFields,
  defaultValue = null,
  isRequired = false,
  ...props
}: Props) => {
  const { control, trigger } = useFormContext();
  const { field } = useController({ name, control, ...controllerProps, defaultValue });
  const error = useInputError(name);

  const handleOnChange = useCallback(
    (e: SelectChangeEvent) => {
      if (onChange) onChange?.(e, field);
      else field.onChange(e);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields]
  );

  // const helperText = error || props.helperText;
  return (
    <FormControl fullWidth size='small' error={!!error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...field}
        IconComponent={StyledKeyboardArrowDownOutlined}
        MenuProps={{ elevation: 3 }}
        {...props}
        ref={null}
        inputRef={_ref => _ref && handleInputRef(_ref as HTMLElement, field)}
        value={options.find(item => isEqual(item.value, field.value))?.value ?? ''}
        onChange={handleOnChange}
        labelId={labelId}
        label={label}
        error={!!error}
        inputProps={{ 'data-testid': labelId }}>
        {options.map(item => {
          return (
            <MenuItem key={isObjectLike(item.value) ? JSON.stringify(item.value) : item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      <InputHelper addMargin error={error} isRequired={isRequired} helperText={props.helperText} />
    </FormControl>
  );
};

export default memo(Dropdown);
