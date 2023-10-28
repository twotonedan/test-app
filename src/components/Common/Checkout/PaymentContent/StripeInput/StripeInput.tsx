import { ForwardedRef, useState, useImperativeHandle, forwardRef } from 'react';
import { alpha, useTheme, Theme } from '@mui/material/styles';
import {
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardExpiryElementOptions,
  StripeCardNumberElement,
  StripeCardNumberElementOptions,
  StripeCardCvcElementOptions,
} from '@stripe/stripe-js';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';

const styles = (theme: Theme) => ({
  base: {
    color: theme.palette.text.primary,
    fontSize: '14px',
    fontFamily: 'Maven Pro',
    '::placeholder': {
      color: alpha(theme.palette.text.primary, 0.42),
    },
  },
  invalid: {
    color: theme.palette.text.primary,
  },
});

type StripeComponents = typeof CardNumberElement | typeof CardExpiryElement | typeof CardCvcElement;

type StripeRef = { focus: () => void };

type Props = {
  component: StripeComponents;
  options: StripeCardExpiryElementOptions | StripeCardNumberElementOptions | StripeCardCvcElementOptions;
  onReady?: (element: StripeCardNumberElement | StripeCardExpiryElement | StripeCardCvcElement | null) => void;
};

function StripeInput(props: Props, ref?: ForwardedRef<StripeRef>) {
  const { component: Component, options, ...other } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = useState<
    null | StripeCardNumberElement | StripeCardExpiryElement | StripeCardCvcElement
  >(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => mountNode?.focus(),
    }),
    [mountNode]
  );

  const handleOnReady = (element: null | StripeCardNumberElement | StripeCardExpiryElement | StripeCardCvcElement) => {
    setMountNode(element);
    other.onReady?.(element);
  };

  return (
    <Component
      onReady={handleOnReady}
      options={{
        ...options,
        style: styles(theme),
      }}
      {...other}
    />
  );
}

export default forwardRef(StripeInput);
