import { memo } from 'react';
import { Dialog, styled } from '@mui/material';
import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import theme from '@/theme';

import SuccessCheckout from './SuccessCheckout/SuccessCheckout';
import PostCheckoutHeader from './PostCheckoutHeader/PostCheckoutHeader';
import ErrorCheckout, { StripeError } from './ErrorCheckout/ErrorCheckout';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-container > .MuiPaper-root {
    ${theme.mixins.layout}
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 8px;
    ${theme.breakpoints.up('md')} {
      max-width: 1069px;
      height: auto;
      width: auto;
      padding: 0 24px 24px;
    }
  }
`;

type CreateAccountProps = {
  password: string;
};
interface Props extends NiceModalHocProps {
  onClose?: () => void;
  orderId?: string;
  isLoggedIn?: boolean;
  stripeError?: StripeError;
  onCreateAccount?: (data: CreateAccountProps) => void;
  accountCreated?: boolean;
}

const PostCheckoutModal = NiceModal.create(
  ({ onClose, orderId, isLoggedIn, stripeError, onCreateAccount, accountCreated = false }: Props) => {
    const modal = useModal();
    const { isOpen, handleOnClose } = useMuiDrawer(modal);

    const handleCloseModal = () => {
      onClose?.();
      handleOnClose();
    };

    return (
      <StyledDialog open={isOpen} onClose={handleCloseModal}>
        <PostCheckoutHeader onClose={handleCloseModal} stripeError={stripeError} />
        {orderId ? (
          <SuccessCheckout
            orderId={orderId}
            isLoggedIn={!!isLoggedIn}
            onCreateAccount={onCreateAccount}
            accountCreated={accountCreated}
          />
        ) : (
          <ErrorCheckout onClose={handleOnClose} stripeError={stripeError} />
        )}
      </StyledDialog>
    );
  }
);

export default memo(PostCheckoutModal);
