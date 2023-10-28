import theme from '@/theme/theme';
import { Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCartData } from '@/hooks/contexts/useCartData';
import useIsDesktop from '@/hooks/useIsDesktop';
import NiceModal from '@ebay/nice-modal-react';
import ShareButton from './ShareButton';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledContainer = styled(Box)`
  margin-top: 12px;
  display: flex;
  gap: 24px;
`;

const StyledButton = styled(Button)`
  margin-right: 2px;

  &.MuiButton-text {
    font-weight: 600;
  }
`;

const Subheader = () => {
  const { t } = useTranslation(['actions', 'common']);
  const { clearCart } = useCartData();
  const clearModalId = 'remove-item-cart-modal-45';
  const isDesktop = useIsDesktop();

  const handleShowConfirmModal = () => NiceModal.show(clearModalId);

  return (
    <>
      <StyledWrapper>
        {isDesktop ? (
          <StyledContainer>
            <Typography variant='h1'>{t('common:cart')}</Typography>
            <ShareButton />
          </StyledContainer>
        ) : (
          <ShareButton />
        )}
        <StyledButton onClick={handleShowConfirmModal}>{t('actions:empty')}</StyledButton>
      </StyledWrapper>
      <ConfirmModal
        id={clearModalId}
        confirmChangesTitle={t('common:deleteCart.confirmChangesTitle')}
        confirmChangesDescription={t('common:deleteCart.confirmChangesDescription')}
        confirmChangeText={t('common:deleteCart.delete')}
        onConfirmChanges={() => clearCart()}
      />
    </>
  );
};

export default Subheader;
