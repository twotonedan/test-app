import { styled, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IBookingAccessory } from '@/types/dockQueue';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    max-width: 321px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 8px;
  padding-top: 32px;
`;

const StyledDialogContent = styled(DialogContent)`
  font-size: 16px;
  text-align: center;
  padding-bottom: 0;
`;

const StyledButton = styled(Button)`
  width: 132px;
`;

const StyledDialogActions = styled(DialogActions)`
  display: flex;
  gap: 8px;
  padding: 32px 24px;
`;

interface Props extends NiceModalHocProps {
  onConfirm: () => void;
  accessories: IBookingAccessory[];
}

const ConfirmModal = NiceModal.create(({ onConfirm, accessories }: Props) => {
  const modal = useModal();
  const { t } = useTranslation('actions');
  const { isOpen, handleOnClose } = useMuiDrawer(modal);

  return (
    <StyledDialog open={isOpen} onClose={handleOnClose}>
      <StyledDialogTitle>{t('confirmAccessories')}</StyledDialogTitle>
      <StyledDialogContent>
        {accessories.map(acc => (
          <Grid container key={acc.id}>
            <Grid item xs={6}>
              <Typography key={acc.id}>{acc.title}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography key={acc.id}>${acc.rate.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        ))}
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={handleOnClose} variant='outlined'>
          {t('cancel')}
        </StyledButton>
        <StyledButton onClick={onConfirm} variant='contained' autoFocus>
          {t('save')}
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
});

export default ConfirmModal;
