import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import { styled, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
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
  onConfirmChanges: () => void;
  confirmChangesTitle: string;
  confirmChangesDescription: string;
  confirmChangeText?: string;
}

const ConfirmModal = NiceModal.create(
  ({ onConfirmChanges, confirmChangesTitle, confirmChangesDescription, confirmChangeText }: Props) => {
    const modal = useModal();
    const { t } = useTranslation(['common']);
    const { isOpen, handleOnClose } = useMuiDrawer(modal);

    const handleOnConfirmChanges = () => {
      handleOnClose();
      onConfirmChanges();
    };

    return (
      <StyledDialog open={isOpen} onClose={handleOnClose}>
        <StyledDialogTitle>{confirmChangesTitle}</StyledDialogTitle>
        <StyledDialogContent> {confirmChangesDescription}</StyledDialogContent>
        <StyledDialogActions>
          <StyledButton onClick={handleOnClose} variant='outlined'>
            {t('common:cancel')}
          </StyledButton>
          <StyledButton onClick={handleOnConfirmChanges} variant='contained' color='error' autoFocus>
            {confirmChangeText || t('common:exit')}
          </StyledButton>
        </StyledDialogActions>
      </StyledDialog>
    );
  }
);

export default ConfirmModal;
