import { ControllersProps } from '@/types';
import { InputProps as OriginalInputProps, TextField, TextFieldProps } from '@mui/material';
import { isFunction } from 'lodash';
import useInputError from '@/hooks/useInputError';
import {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useController,
  useFormContext,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';
import handleInputRef from '@/utils/handleInputRef';
import InputHelper from '../InputHelper';

type FieldParamsType = {
  field: ControllerRenderProps<FieldValues, string>;
  resetField: UseFormResetField<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  handleCallbackFunc: () => void;
};

type Props = Omit<TextFieldProps, 'InputProps'> &
  ControllersProps & {
    name: string;
    InputProps?: Omit<OriginalInputProps, 'startAdornment' | 'endAdornment'> & {
      startAdornment?: ((fieldParams: FieldParamsType) => ReactNode) | ReactNode;
      endAdornment?: ((fieldParams: FieldParamsType) => ReactNode) | ReactNode;
    };
    keepInputFocused?: boolean;
    validateFields?: string | string[];
    supportingText?: string;
    isRequired?: boolean;
    className?: string;
    showError?: boolean;
    maxLength?: number;
  };

const Input = (
  {
    controllerProps,
    name,
    InputProps,
    InputLabelProps,
    keepInputFocused,
    validateFields,
    onChange,
    onFocus,
    onBlur,
    supportingText,
    isRequired,
    className,
    showError = true,
    maxLength,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { control, resetField, setValue, trigger } = useFormContext();
  const { field } = useController({ name, control, ...controllerProps });
  const internalRef = useRef<HTMLInputElement>(null);
  const error = useInputError(name);
  const [shrink, setShrink] = useState(!!field.value);
  const adornmentProps = useMemo(
    () => ({
      field,
      resetField,
      setValue,
      handleCallbackFunc: () => setShrink(false),
    }),
    [field, resetField, setValue]
  );

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      onFocus?.(e);
      setShrink(true);
    },
    [onFocus]
  );

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      if (onBlur) onBlur?.(e);
      else field.onBlur();
      if (e.target.value || keepInputFocused) return;
      setShrink(false);
    },
    [field, keepInputFocused, onBlur]
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) {
        return;
      }

      if (onChange) onChange?.(e);
      else field.onChange(e);

      if (validateFields) trigger(validateFields);
    },
    [field, onChange, trigger, validateFields, maxLength]
  );

  useEffect(() => {
    if (shrink) return;
    setShrink(!!props.value);
  }, [shrink, props.value]);

  useEffect(() => {
    const inputElement = ref ? (ref as React.MutableRefObject<HTMLInputElement | null>).current : internalRef.current;
    if (!inputElement) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animationHandlers: Record<string, (e: any) => void> = {
      'mui-auto-fill': handleOnFocus,
      'mui-auto-fill-cancel': handleOnBlur,
    };

    const animationStartHandler = (e: AnimationEvent) => {
      const { animationName } = e;
      const handler = animationHandlers[animationName];

      if (handler) {
        handler(e);
      }
    };

    inputElement.addEventListener('animationstart', animationStartHandler);
  }, [handleOnFocus, handleOnBlur, ref]);

  return (
    <TextField
      {...field}
      {...props}
      className={className}
      ref={ref || internalRef}
      inputRef={_ref => handleInputRef(_ref, field)}
      error={!!error}
      helperText={showError && <InputHelper error={error} isRequired={isRequired} helperText={supportingText} />}
      size='small'
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      InputLabelProps={{ ...InputLabelProps, shrink }}
      InputProps={{
        ...InputProps,
        startAdornment: isFunction(InputProps?.startAdornment)
          ? InputProps?.startAdornment?.(adornmentProps)
          : InputProps?.startAdornment,
        endAdornment: isFunction(InputProps?.endAdornment)
          ? InputProps?.endAdornment?.(adornmentProps)
          : InputProps?.endAdornment,
      }}
    />
  );
};

export default forwardRef(Input);
