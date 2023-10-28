import constate from 'constate';
import { useState } from 'react';

type Props = {
  setSelectedCard: (card: string | null) => void;
  setIsEditCardsMode: (isEditCardsMode: boolean) => void;
  isEditCardsMode: boolean;
  selectedCard: string | null;
  stripeCustomerId?: string;
};

const $usePaymentContext = (props: Props) => {
  const [showAddCardForm, setShowAddCardForm] = useState<boolean>(false);
  return { ...props, showAddCardForm, setShowAddCardForm };
};

export const [PaymentContextProvider, usePaymentContext] = constate($usePaymentContext);
