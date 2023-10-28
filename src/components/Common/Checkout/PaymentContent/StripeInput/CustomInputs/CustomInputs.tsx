import theme from '@/theme';
import useTwoDigitsFormatDate from '@/hooks/formatters/useTwoDigitsFormatDate';
import { PatternFormat } from 'react-number-format';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SvgIcon, TextField, styled } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { AmericanExpress, Diners, Discover, JCB, Mastercard, Unionpay, Visa } from '@/assets/images';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { expirationToDate } from '@/utils/formatDates';

export const PaymentBrands = {
  amex: AmericanExpress,
  diners: Diners,
  jcb: JCB,
  mastercard: Mastercard,
  unionpay: Unionpay,
  visa: Visa,
  discover: Discover,
  unknown: CreditCardIcon,
};

export type CustomDataType = {
  last4: string;
  expMonth: number;
  expYear: number;
  brand: string;
};

type Props = {
  customData: CustomDataType | undefined;
  handleHideCustomInputs: () => void;
};

export function CustomStripeTextFieldNumber({ customData, handleHideCustomInputs }: Props) {
  return (
    <PatternFormat
      value={customData?.last4}
      label='Number'
      size='small'
      fullWidth
      onClick={handleHideCustomInputs}
      customInput={TextField}
      format='**** **** **** ####'
      type='text'
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position='start'>
            {customData?.brand && (
              <SvgIcon component={PaymentBrands[customData.brand as keyof typeof PaymentBrands]} className='icon' />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}

const StyledCheckIcon = styled(CheckCircleOutlineIcon)`
  color: ${theme.palette.customColors.lightGreen};
`;

export function CustomStripeTextFieldExpiry({ customData, handleHideCustomInputs }: Props) {
  const { formatMonthYear } = useTwoDigitsFormatDate();
  return (
    <PatternFormat
      customInput={TextField}
      label='MM/YY'
      size='small'
      fullWidth
      onClick={handleHideCustomInputs}
      format='##/##'
      value={customData ? formatMonthYear(expirationToDate(customData.expMonth, customData.expYear)) : ''}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position='end'>
            <StyledCheckIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

type CVCProps = {
  handleHideCustomInputs: () => void;
};

export function CustomStripeTextFieldCVC({ handleHideCustomInputs }: CVCProps) {
  return (
    <TextField
      label='CVC'
      size='small'
      fullWidth
      onClick={handleHideCustomInputs}
      defaultValue='***'
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position='end'>
            <StyledCheckIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
