import NiceModal from '@ebay/nice-modal-react';
import { PageType } from '@/types/enums';
import { useRouter } from 'next/router';
import { StripeError } from '@/components/Common/Checkout/PostCheckoutModal/ErrorCheckout/ErrorCheckout';
import useToPath from './useToPath';
import { useCartData } from './contexts/useCartData';
import { useUserState } from './contexts/useUserState';

export type CreateAccountProps = {
  password: string;
};

const usePostCheckoutModal = () => {
  const postCheckoutModalId = 'post-checkout-modal-id';
  const { toPath } = useToPath({ pageType: PageType.INDEX });
  const { isLoggedIn, loginUser, createAccount } = useUserState();
  const { clearCart } = useCartData();
  const router = useRouter();

  const handleClosePostCheckoutModal = () => {
    router.push({ pathname: toPath() });
    clearCart();
  };

  const handleCreateAccount = (orderId: string) => (data: CreateAccountProps) => {
    createAccount(
      { ...data },
      {
        onSuccess: () => {
          loginUser();
          NiceModal.hide(postCheckoutModalId);
          NiceModal.show(postCheckoutModalId, {
            onClose: () => {
              handleClosePostCheckoutModal();
            },
            orderId,
            isLoggedIn: true,
            accountCreated: true,
          });
        },
      }
    );
  };

  const handleOpenPostCheckoutSuccess = (orderId: string) => {
    NiceModal.show(postCheckoutModalId, {
      orderId,
      onClose: () => {
        handleClosePostCheckoutModal();
      },
      isLoggedIn,
      onCreateAccount: handleCreateAccount(orderId),
    });
  };

  const handleOpenPostCheckoutError = (stripeError: StripeError) => {
    NiceModal.show(postCheckoutModalId, {
      onClose: () => {
        handleClosePostCheckoutModal();
      },
      stripeError,
    });
  };

  return { postCheckoutModalId, handleOpenPostCheckoutSuccess, handleOpenPostCheckoutError };
};

export default usePostCheckoutModal;
