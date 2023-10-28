import Input from '@/components/Common/Input';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme';
import { transientOptions } from '@/utils/transientOptions';
import { CloseOutlined } from '@mui/icons-material';
import { IconButton, Typography, styled } from '@mui/material';
import { useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { NumberFormatBase } from 'react-number-format';

const StyledInput = styled(Input, transientOptions)<{ $hasError: boolean; $fontSize: number }>`
  margin-top: 32px;

  .MuiInputBase-root {
    border-bottom: 1px dashed ${theme.palette.customColors.gray};
    padding-left: 0;
  }

  .start-adornment {
    color: ${props => (props.$hasError ? theme.palette.error.main : theme.palette.customText.primary)};
  }

  .MuiInputBase-input {
    font-size: ${props => props.$fontSize}px;
    font-weight: 600;
    line-height: 30px;
    color: ${props => (props.$hasError ? theme.palette.error.main : theme.palette.customText.primary)};

    &::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

type Props = {
  baseName: string;
  error: string;
  onIconClick: () => void;
  onChange?: (value: number) => void;
};

const defaultFontSize = 24;

const CustomAmountInput = ({ baseName, error, onIconClick, onChange, ...props }: Props) => {
  const defaultCreditsValue = useWatch({ name: baseName });
  const [intValue, setValue] = useState({ value: defaultCreditsValue * 10000, fontSize: defaultFontSize });
  const { currencyFormatter } = useCurrencyFormatter();
  const ref = useRef(null);

  const onResetValue = () => {
    setValue(prev => ({ ...prev, value: 0 }));
    onIconClick();
  };

  const formatter = (formattedValue: string) => {
    if (!Number(formattedValue)) return '0,00';
    return currencyFormatter.format(Number(formattedValue) / 100);
  };

  const calculateFontSize = (value: string) => {
    if (value.length === 0 || Number(value) === 0) {
      setValue(prev => ({
        ...prev,
        fontSize: defaultFontSize,
      }));
      return;
    }

    if (value.length < 6) return;
    setValue(prev => ({
      ...prev,
      fontSize: Math.max(defaultFontSize - (value.length - 6 || 0) * 2, 12),
    }));
  };

  return (
    <NumberFormatBase
      name={baseName}
      fullWidth
      inputRef={ref}
      validateFields={baseName}
      format={formatter}
      customInput={StyledInput}
      value={intValue.value ? Number(intValue.value) / 100 : '0,00'}
      onValueChange={values => {
        calculateFontSize(values.value);
        setValue(prev => ({ ...prev, value: parseFloat(values.value) * 100 }));
        onChange?.((values.floatValue || 0) / 100);
      }}
      $hasError={!!error}
      showError={false}
      defaultValue={0}
      maxLength={15}
      $fontSize={intValue.fontSize}
      {...props}
      InputProps={{
        startAdornment: (
          <Typography variant='h1' className='start-adornment'>
            $
          </Typography>
        ),
        endAdornment: (
          <IconButton onClick={onResetValue}>
            <CloseOutlined />
          </IconButton>
        ),
      }}
    />
  );
};

export default CustomAmountInput;
