import { ComponentProps, ChangeEventHandler, ElementType, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { AmericanExpress, Diners, Discover, JCB, Mastercard, Unionpay, Visa } from '@/assets/images';

import {
  AuBankAccountElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  FpxBankElement,
  IbanElement,
  IdealBankElement,
} from '@stripe/react-stripe-js';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, InputBaseComponentProps, Skeleton, SvgIcon, styled } from '@mui/material';
import { StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { transientOptions } from '@/utils/transientOptions';
import StripeInput from './StripeInput';

const StyledTextField = styled(TextField, transientOptions)<{ $isHidden: boolean }>`
  ${({ $isHidden }) => $isHidden && 'display: none;'}
`;

const StyledContainer = styled(Box, transientOptions)<{ $isHidden: boolean }>`
  ${props => (props.$isHidden ? 'display: none' : 'display: block')}
`;

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

type StripeElement =
  | typeof AuBankAccountElement
  | typeof CardCvcElement
  | typeof CardExpiryElement
  | typeof CardNumberElement
  | typeof FpxBankElement
  | typeof IbanElement
  | typeof IdealBankElement;

interface StripeTextFieldProps<T extends StripeElement>
  extends Omit<TextFieldProps, 'onChange' | 'inputComponent' | 'inputProps'> {
  inputProps?: ComponentProps<T>;
  labelErrorMessage?: string;
  isHidden?: boolean;
  onChange?: ComponentProps<T>['onChange'];
  stripeElement?: T;
}

export const StripeTextField = <T extends StripeElement>(props: StripeTextFieldProps<T>) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    helperText,
    InputLabelProps,
    InputProps = {},
    inputProps,
    isHidden,
    error,
    labelErrorMessage,
    stripeElement,
    onChange,
    ...other
  } = props;

  return (
    <StyledContainer $isHidden={isHidden || false}>
      {isLoading && <Skeleton variant='rounded' height={40} />}
      <StyledTextField
        $isHidden={isLoading}
        fullWidth
        InputLabelProps={{
          ...InputLabelProps,
          shrink: true,
        }}
        error={error}
        size='small'
        onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
        InputProps={{
          ...InputProps,
          inputProps: {
            ...inputProps,
            ...InputProps.inputProps,
            onReady: () => setIsLoading(false),
            component: stripeElement,
          } as InputBaseComponentProps,
          inputComponent: StripeInput as unknown as ElementType<InputBaseComponentProps>,
        }}
        helperText={error ? labelErrorMessage : helperText}
        {...other}
      />
    </StyledContainer>
  );
};

export function StripeTextFieldNumber(props: StripeTextFieldProps<typeof CardNumberElement>) {
  const { onChange } = props;
  const [brandLogo, setBrandLogo] = useState<string | null>();

  const handleCardNumberChange = (e: StripeCardNumberElementChangeEvent) => {
    setBrandLogo(e.brand);
    onChange?.(e);
  };

  return (
    <StripeTextField
      label='Number'
      stripeElement={CardNumberElement}
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            {brandLogo && (
              <SvgIcon component={PaymentBrands[brandLogo as keyof typeof PaymentBrands]} className='icon' />
            )}
          </InputAdornment>
        ),
      }}
      {...props}
      onChange={handleCardNumberChange}
    />
  );
}

export function StripeTextFieldExpiry(props: StripeTextFieldProps<typeof CardExpiryElement>) {
  return <StripeTextField label='MM/YY' stripeElement={CardExpiryElement} {...props} />;
}

export function StripeTextFieldCVC(props: StripeTextFieldProps<typeof CardCvcElement>) {
  return <StripeTextField label='CVC' stripeElement={CardCvcElement} {...props} />;
}
