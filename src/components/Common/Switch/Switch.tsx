import useInputError from '@/hooks/useInputError';
import { ControllersProps } from '@/types';
import { FormControlLabel, styled, Switch as MUISwitch, SwitchProps, Typography } from '@mui/material';
import { ChangeEvent, memo, useCallback } from 'react';
import { ControllerRenderProps, FieldValues, useController, useFormContext } from 'react-hook-form';

const StyledLabelTypography = styled(Typography)`
  display: block;
`;

type Props = Omit<SwitchProps, 'onChange'> &
  ControllersProps & {
    name: string;
    validateFields?: string | string[];
    onChange?: (checked: boolean, field: ControllerRenderProps<FieldValues, string>) => void;
    label?: string | null;
  };

const StyledFormControlLabel = styled(FormControlLabel)`
  display: flex;
  column-gap: 8px;
`;

const Switch = ({
  name,
  controllerProps,
  onChange,
  validateFields,
  defaultValue,
  defaultChecked = false,
  label,
  className,
  ...props
}: Props) => {
  const { control, trigger } = useFormContext();
  const { field } = useController({ name, control, ...controllerProps, defaultValue: defaultValue ?? defaultChecked });
  const error = useInputError(name);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (onChange) onChange?.(checked, field);
      else field.onChange(checked);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields]
  );

  return (
    <StyledFormControlLabel
      className={className}
      control={
        <MUISwitch
          {...field}
          {...props}
          checked={!!(props.checked ?? field.value)}
          onChange={handleOnChange}
          color={error ? 'error' : props.color}
        />
      }
      label={
        <StyledLabelTypography variant='label' className='switch-label'>
          {label}
        </StyledLabelTypography>
      }
    />
  );
};

export default memo(Switch);
