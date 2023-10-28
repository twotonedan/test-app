import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCallback, useState } from 'react';
import { some } from 'lodash';
import { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js';
import { AxiosError } from 'axios';
import { StripeError } from '@/components/Common/Checkout/PostCheckoutModal/ErrorCheckout/ErrorCheckout';
import { useUserState } from './contexts/useUserState';
import { useNewPaymentState } from './contexts/useNewPaymentCard';
import useCreateStripeIntent, { IntentResponse } from './api/useCreateStripeIntent';
import { CartData } from './contexts/useCartData';
import { PromoCode } from './contexts/useCalculatePrice';
import useSaveStripeCard from './api/useSaveStripeCard';
import useEditStripeCard from './api/useEditStripeCard';
import useCreatePaymentMethod from './stripe/useCreatePaymentMethod';
import usePostCheckoutModal from './usePostCheckoutModal';

type Props = {
  cartData?: CartData[];
  promoCodeData?: PromoCode;
  creditsData?: number;
};

export type CreateAccountProps = {
  password: string;
};

const usePaymentHandlers = ({ cartData, promoCodeData, creditsData }: Props = {}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isEditCardsMode, setIsEditCardsMode] = useState<boolean>(false);

  const { cardState } = useNewPaymentState();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { userData, isLoggedIn } = useUserState();

  const { mutateAsync: createStripePaymentMethod, isLoading: isCreatePMInProgress } = useCreatePaymentMethod();
  const { mutate: createStripeIntent, isLoading: isPayInProgress } = useCreateStripeIntent();
  const { mutate: saveStripeCard, isLoading: isSaveInProgress } = useSaveStripeCard();
  const { mutate: editStripeCard, isLoading: isSaveEditInProgress } = useEditStripeCard();
  const { handleOpenPostCheckoutSuccess, handleOpenPostCheckoutError } = usePostCheckoutModal();

  const showPostModal = useCallback(
    (orderPaymentId: string) => handleOpenPostCheckoutSuccess(orderPaymentId),
    [handleOpenPostCheckoutSuccess]
  );

  const createPaymentCard = async () => {
    const cardNumber = elements?.getElement(CardNumberElement);
    if (!cardNumber || !stripe) return null;

    const { error, paymentMethod } = (await createStripePaymentMethod({ type: 'card', card: cardNumber })) || {};
    if (!error) return paymentMethod?.id;
    return null;
  };

  const createValidPaymentCard = async () => {
    const { stripeCustomerId } = userData || {};
    if (!stripeCustomerId) return null;

    const paymentMethodId = await createPaymentCard();
    if (!paymentMethodId) return null;
    return { paymentMethodId, stripeCustomerId };
  };

  const handleSavePaymentCard = async () => {
    const { stripeCustomerId, paymentMethodId } = (await createValidPaymentCard()) || {};
    if (!stripeCustomerId || !paymentMethodId) return;
    saveStripeCard({ paymentMethodId, stripeCustomerId });
  };

  const handleEditPaymentCard = async (oldPaymentMethodId: string) => {
    const { stripeCustomerId, paymentMethodId } = (await createValidPaymentCard()) || {};
    if (!stripeCustomerId || !paymentMethodId) return;
    editStripeCard({ stripeCustomerId, oldPaymentMethodId, newPaymentMethodId: paymentMethodId });
  };

  const handleSubmit = async () => {
    const { stripeCustomerId = '' } = userData || {};
    const paymentMethodId = isLoggedIn && selectedCard ? selectedCard : await createPaymentCard();
    if (!paymentMethodId || !cartData) return;

    createStripeIntent(
      { paymentMethodId, stripeCustomerId, cartData, promoCodeData, creditsData, confirm: true },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: any) => {
          const {
            paymentIntent: { id: orderPaymentId },
          } = response;
          showPostModal(orderPaymentId);
        },
        onError: error => {
          const err = error as AxiosError;
          handleOpenPostCheckoutError(err.response?.data as StripeError);
        },
      }
    );
  };

  const onSubmitPaymentSucces = useCallback(
    async (e: PaymentRequestPaymentMethodEvent, response: IntentResponse) => {
      if (!stripe) return;
      const {
        paymentIntent: { client_secret: clientSecret, id: orderPaymentId },
      } = response;
      if (!clientSecret) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: e.paymentMethod.id },
        { handleActions: false }
      );

      if (error) {
        e.complete('fail');
        return;
      }

      e.complete('success');
      if (paymentIntent.status === 'requires_action') stripe.confirmCardPayment(clientSecret);
      showPostModal(orderPaymentId);
    },
    [stripe, showPostModal]
  );

  const handleSubmitPaymentRequest = useCallback(
    async (e: PaymentRequestPaymentMethodEvent) => {
      const { stripeCustomerId = '' } = userData || {};

      if (!cartData || !stripe) return;

      createStripeIntent(
        { stripeCustomerId, cartData, promoCodeData, creditsData },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (res: any) => onSubmitPaymentSucces(e, res),
          onError: () => {
            /* TODO: REDIRECT TO ERROR */
          },
        }
      );
    },
    [userData, cartData, stripe, createStripeIntent, promoCodeData, creditsData, onSubmitPaymentSucces]
  );

  const isReady = stripe && elements;
  const isPayDisabled =
    !isReady ||
    isEditCardsMode ||
    (isLoggedIn ? !selectedCard && some(cardState, v => !v.completed) : some(cardState, v => !v.completed));

  const isSaveCardDisabled = !isReady || some(cardState, v => !v.completed);

  return {
    isSaveCardDisabled,
    isReady,
    isPayDisabled,
    isCreatePMInProgress,
    isPayInProgress: isCreatePMInProgress || isPayInProgress,
    isSaveInProgress: isCreatePMInProgress || isSaveInProgress,
    isSaveEditInProgress: isCreatePMInProgress || isSaveEditInProgress,
    isEditCardsMode,
    setIsEditCardsMode,
    selectedCard,
    setSelectedCard,
    handleSavePaymentCard,
    handleEditPaymentCard,
    handleSubmit,
    handleSubmitPaymentRequest,
  };
};

export default usePaymentHandlers;
