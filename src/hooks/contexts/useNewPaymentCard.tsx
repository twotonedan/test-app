import constate from 'constate';
import { useCallback, useState } from 'react';

export const DefaultNewPaymentCardState = {
  number: { error: '', completed: false },
  expire: { error: '', completed: false },
  cvc: { error: '', completed: false },
};

type CardItemProps = {
  error: string;
  completed?: boolean;
};

export type CardProps = {
  number: CardItemProps;
  expire: CardItemProps;
  cvc: CardItemProps;
};

const useNewPaymentCardContext = () => {
  const [cardState, setCardState] = useState<CardProps>(DefaultNewPaymentCardState);

  const resetCardState = useCallback(() => setCardState(DefaultNewPaymentCardState), []);

  return { cardState, setCardState, resetCardState };
};

export const [NewPaymentCardProvider, useNewPaymentState] = constate(useNewPaymentCardContext);
