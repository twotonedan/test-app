/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { styled, Divider, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import useGetStripeCards from '@/hooks/api/useGetStripeCards';
import { usePaymentContext } from '@/hooks/contexts/usePaymentContext';
import CardForm from '../CardForm';
import EditCards from '../EditCards/EditCards';
import SavedCards from '../SavedCards/SavedCards';
import AddCardButton from './AddCardButton';

const StyledTypographySubTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  margin: 12px 0;
`;

type CardItemProps = {
  error: string;
  completed?: boolean;
};

export type CardProps = {
  number: CardItemProps;
  expire: CardItemProps;
  cvc: CardItemProps;
};

function CardsFormWithUser() {
  const { t } = useTranslation('common');

  const {
    stripeCustomerId,
    setShowAddCardForm,
    setSelectedCard,
    setIsEditCardsMode,
    showAddCardForm,
    isEditCardsMode,
  } = usePaymentContext();

  const { isLoading, data: paymentCards = [] } = useGetStripeCards(stripeCustomerId!, { enabled: !!stripeCustomerId });

  const handleAddNewCard = () => {
    setSelectedCard(null);
    setIsEditCardsMode(false);
    setShowAddCardForm(true);
  };

  if (isEditCardsMode)
    return (
      <>
        <EditCards cards={paymentCards} />
        <AddCardButton onClick={handleAddNewCard} />
      </>
    );

  return (
    <>
      {(isLoading || !!paymentCards.length) && (
        <>
          <Divider />
          <SavedCards isLoading={isLoading} cards={paymentCards} />
        </>
      )}
      {showAddCardForm || paymentCards.length === 0 ? (
        <>
          <Divider />
          <StyledTypographySubTitle>{t('payment.subTitle')}</StyledTypographySubTitle>
          <CardForm />
        </>
      ) : (
        <AddCardButton onClick={handleAddNewCard} isDisabled={isLoading} />
      )}
    </>
  );
}

export default CardsFormWithUser;
