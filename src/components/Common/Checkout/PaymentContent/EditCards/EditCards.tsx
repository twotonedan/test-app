import { Box, Button, CircularProgress, IconButton, styled } from '@mui/material';
import theme from '@/theme';
import { motion } from 'framer-motion';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useTranslation } from 'next-i18next';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useState, useId } from 'react';
import { transientOptions } from '@/utils/transientOptions';
import Stripe from 'stripe';
import usePaymentHandlers from '@/hooks/usePaymentHandlers';
import ConfirmModal from '@/components/Common/ConfirmModal/ConfirmModal';
import NiceModal from '@ebay/nice-modal-react';
import useDeleteStripeCard from '@/hooks/api/useDeleteStripeCard';
import { usePaymentContext } from '@/hooks/contexts/usePaymentContext';
import CardForm from '../CardForm/CardForm';
import CardRow from '../CardRow/CardRow';

const StyledContainer = styled(Box)`
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledCardContainer = styled(Box)`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: start;
`;

const StyledSaveButton = styled(Button)`
  margin-top: 16px;
`;

const StyledDeleteButton = styled(IconButton)`
  height: fit-content;
  margin: auto 0;
`;

const StyledDeleteOutlinedIcon = styled(DeleteOutlinedIcon)`
  color: ${theme.palette.error.main};
`;

const StyledAccordionHeader = styled('div')`
  display: flex;
  width: 100%;
`;

const StyledAccordionContent = styled('div')`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  border: 1px solid ${theme.palette.customInput.border};
`;

const StyledCardButton = styled(Button)`
  width: 100%;
  border-radius: 10px;
  height: 48px;
  justify-content: flex-start;
  max-height: 48px;
  &:hover {
    background-color: transparent;
  }
`;

const StyledAccordionCardContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 12px;
`;

const StyledAccordionDelete = styled('div')`
  text-align: center;
  width: 40px;
  margin-top: 6px;
  margin-left: 8px;
  overflow: hidden;
`;

const StyledArrowForwardIosSharpIcon = styled(ArrowForwardIosSharpIcon, transientOptions)<{ $isOpen: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${props => props.$isOpen && 'transform: rotate(90deg);'}
  transition: transform ease-out 0.2s;
  margin-top: 16px;
`;

const cardContentVariants = {
  initial: {
    height: 0,
    display: 'none',
    opacity: 0,
  },
  animate: {
    height: 'auto',
    display: 'flex',
    opacity: 1,
  },
};

const cardDeleteVariants = {
  initial: {
    opacity: 1,
    width: 'auto',
  },
  animate: {
    opacity: 0,
    width: 0,
  },
};

const MotionAccordionContent = motion(StyledAccordionContent);
const MotionAccordionDelete = motion(StyledAccordionDelete);
const MotionAccordionCardContent = motion(StyledAccordionCardContent);

type Props = {
  cards?: Stripe.PaymentMethod[];
};

function EditCards({ cards = [] }: Props) {
  const { t } = useTranslation('common');
  const modalId = useId();
  const deleteModalId = `confirm-delete-modal-${modalId}`;
  const [expanded, setExpanded] = useState<string | null>(null);
  const { mutate: deleteStripeCard } = useDeleteStripeCard();
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const { handleEditPaymentCard, isSaveCardDisabled, isSaveEditInProgress } = usePaymentHandlers();
  const { setIsEditCardsMode } = usePaymentContext();

  const handleConfirmRemovePaymentMethod = () => {
    deleteStripeCard({ paymentMethodId: selectedCardId });
    setIsEditCardsMode(false);
  };

  const handleShowDeleteModal = (cardId: string) => {
    setSelectedCardId(cardId);
    NiceModal.show(deleteModalId);
  };

  return (
    <StyledContainer>
      {cards.map(cardItem => {
        const { card } = cardItem;
        if (!card) return null;

        const isOpen = expanded === cardItem.id;
        const { brand, last4, exp_month: expMonth, exp_year: expYear } = card;

        return (
          <StyledCardContainer key={cardItem.id}>
            <StyledArrowForwardIosSharpIcon
              sx={{ fontSize: 16 }}
              $isOpen={isOpen}
              onClick={() => setExpanded(isOpen ? null : cardItem.id)}
            />
            <StyledAccordionHeader>
              <MotionAccordionContent>
                <StyledCardButton variant='text' onClick={() => setExpanded(isOpen ? null : cardItem.id)}>
                  <CardRow brand={brand} last4={last4} expMonth={expMonth} expYear={expYear} />
                </StyledCardButton>
                <MotionAccordionCardContent
                  variants={cardContentVariants}
                  initial='initial'
                  transition={{
                    duration: 0.3,
                  }}
                  animate={isOpen ? 'animate' : 'initial'}>
                  {isOpen ? <CardForm customData={{ last4, expMonth, expYear, brand }} defaultIsCustom /> : null}
                  <StyledSaveButton
                    disabled={isSaveCardDisabled || isSaveEditInProgress}
                    onClick={() => handleEditPaymentCard(cardItem.id)}>
                    {isSaveEditInProgress ? <CircularProgress size={20} /> : t('payment.saveCard')}
                  </StyledSaveButton>
                </MotionAccordionCardContent>
              </MotionAccordionContent>
              <MotionAccordionDelete
                variants={cardDeleteVariants}
                initial='initial'
                animate={isOpen ? 'animate' : 'initial'}>
                <StyledDeleteButton onClick={() => handleShowDeleteModal(cardItem.id)}>
                  <StyledDeleteOutlinedIcon />
                </StyledDeleteButton>
              </MotionAccordionDelete>
            </StyledAccordionHeader>
          </StyledCardContainer>
        );
      })}
      <ConfirmModal
        id={deleteModalId}
        confirmChangeText={t('deleteItem.delete')}
        confirmChangesTitle={t('payment.confirmDeleteCardTitle')}
        confirmChangesDescription={t('payment.confirmDeleteCardMessage')}
        onConfirmChanges={handleConfirmRemovePaymentMethod}
      />
    </StyledContainer>
  );
}

export default EditCards;
