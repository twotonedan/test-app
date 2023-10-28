import { useId } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { CurrentCartItemProvider } from '@/hooks/contexts/useCurrentCartItem';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { ICardPayload } from '@/types/cards';

import CheckoutModal from './CheckoutModal';
import UpsellModal from './UpsellModal';

type Props = {
  $uniqueId?: string;
  defaultClose?: boolean;
  cardData?: ICardPayload;
  backText?: string;
};

const Upsell = NiceModal.create(({ $uniqueId, defaultClose, cardData, backText }: Props) => {
  const id = useId();
  const modal = useModal();
  const { handleOnClose } = useMuiDrawer(modal);

  const upsellModalId = `upsell-modal-${id}`;
  const checkoutModalId = `checkout-modal-${id}`;

  const upsellModal = useModal(upsellModalId);
  const checkoutModal = useModal(checkoutModalId);

  const handleOnRemove = () => {
    if (upsellModal.visible || checkoutModal.visible) return;
    handleOnClose();
  };

  if (!$uniqueId) return null;
  return (
    <CurrentCartItemProvider $uniqueId={$uniqueId}>
      <UpsellModal
        id={upsellModalId}
        onRemove={handleOnRemove}
        checkoutModalId={checkoutModalId}
        itemTitle={cardData?.title}
        defaultVisible
        defaultClose={defaultClose}
        cardData={cardData}
        backText={backText}
      />
      <CheckoutModal id={checkoutModalId} onRemove={handleOnClose} />
    </CurrentCartItemProvider>
  );
});

export default Upsell;
