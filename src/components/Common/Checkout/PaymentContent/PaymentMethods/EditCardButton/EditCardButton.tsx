/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useGetStripeCards from '@/hooks/api/useGetStripeCards';
import { useUserState } from '@/hooks/contexts/useUserState';
import styled from '@emotion/styled';
import { Box, Button, IconButton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { usePaymentContext } from '@/hooks/contexts/usePaymentContext';

const StyledConfirmEdition = styled(Button)`
  padding: 0;
`;

const EditCardButton = () => {
  const { t } = useTranslation('common');
  const { isLoggedIn, userData } = useUserState();
  const { setIsEditCardsMode, setShowAddCardForm, setSelectedCard, isEditCardsMode } = usePaymentContext();

  const { data: stripeCards } = useGetStripeCards(userData?.stripeCustomerId || '', {
    enabled: !!userData?.stripeCustomerId,
  });

  const handleEditMode = (newEditMode: boolean) => () => {
    setSelectedCard(null);
    setShowAddCardForm(false);
    setIsEditCardsMode(newEditMode);
  };

  if (!isLoggedIn || !userData?.stripeCustomerId || !stripeCards?.length) return null;

  return (
    <Box>
      {isEditCardsMode ? (
        <StyledConfirmEdition variant='text' onClick={handleEditMode(false)}>
          {t('done')}
        </StyledConfirmEdition>
      ) : (
        <IconButton color='primary' onClick={handleEditMode(true)}>
          <ModeEditOutlineOutlinedIcon fontSize='small' />
        </IconButton>
      )}
    </Box>
  );
};

export default EditCardButton;
