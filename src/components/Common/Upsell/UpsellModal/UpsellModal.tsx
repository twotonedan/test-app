import { memo, useId, useRef } from 'react';
import { Drawer, styled, Box, Typography, SvgIcon } from '@mui/material';
import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import theme from '@/theme';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import DetailFooter from '@/components/Sections/Common/DetailFooter';
import { useTranslation } from 'next-i18next';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useCartData } from '@/hooks/contexts/useCartData';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import useIsMobile from '@/hooks/useIsMobile';
import usePoliciesHandlers from '@/hooks/usePoliciesHandlers';
import { ICardPayload } from '@/types/cards';
import { ArrowBackIos } from '@mui/icons-material';
import DummyDesktopHeader from '@/components/Sections/Common/Header/DummyDesktopHeader';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import UpsellModalContent from './UpsellModalContent.tsx/UpsellModalContent';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledDetailHeader = styled(DetailHeader)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledBackButton = styled(Box)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    ${theme.mixins.layout};
    display: flex;
    gap: 24px;
    margin-top: 34px;
    margin-bottom: 32px;
    cursor: pointer;
  }
`;

interface ModalProps extends NiceModalHocProps {
  checkoutModalId?: string;
  onRemove: () => void;
  itemTitle?: string;
  defaultClose?: boolean;
  cardData?: ICardPayload;
  hidePricing?: boolean;
  backText?: string;
}

const UpsellModal = NiceModal.create(
  ({
    checkoutModalId,
    onRemove,
    itemTitle = '',
    defaultClose = false,
    cardData,
    hidePricing = false,
    backText,
  }: ModalProps) => {
    const { t } = useTranslation('common');
    const isMobile = useIsMobile();
    const { cartItem } = useCurrentCartItem();
    const containerScrollRef = useRef<HTMLDivElement>(null);

    const exitId = useId();
    const exitModalId = `exit-modal-${exitId}`;

    const modal = useModal();
    const { isOpen, handleOnClose } = useMuiDrawer(modal, { onRemove });
    const { currencyFormatter } = useCurrencyFormatter();
    const { removeFromCart } = useCartData();
    const { $uniqueId, hasUndefinedLocationAccesory } = useCurrentCartItem();
    const { isLoading, prices } = useCalculatePrice();
    const { handleConfirm } = usePoliciesHandlers({ policies: cardData?.policies });

    const accessoriesAdded = cartItem?.accessories.reduce((sum, item) => {
      if (item.location !== undefined || 'location' in item === false) {
        return sum + item.quantity;
      }
      return sum;
    }, 0);

    const handleConfirmRemoveChanges = async () => {
      handleOnClose();
      setTimeout(() => removeFromCart($uniqueId), theme.transitions.duration.leavingScreen);
    };

    const onClickContinue = () => {
      handleConfirm().then(() => {
        handleOnClose();
        if (checkoutModalId) {
          NiceModal.show(checkoutModalId);
        }
      });
    };

    const handleCloseModal = () => {
      if (defaultClose) {
        handleOnClose();
      } else {
        NiceModal.show(exitModalId);
      }
    };

    return (
      <StyledDrawer open={isOpen} onClose={handleOnClose} anchor='right' PaperProps={{ ref: containerScrollRef }}>
        <StyledDetailHeader
          title={isMobile ? `${t('accessories')}` : itemTitle}
          onClickBack={handleCloseModal}
          rightComponent={<div />}
          parentRef={containerScrollRef}
        />
        <DummyDesktopHeader withShadow />
        <StyledBackButton onClick={handleCloseModal}>
          <SvgIcon component={ArrowBackIos} />
          <Typography variant='h3' fontWeight={600}>
            {t('backTo')} {backText}
          </Typography>
        </StyledBackButton>
        <UpsellModalContent hidePricing={hidePricing} />
        {!hidePricing && (
          <DetailFooter
            title={`${t('total')}`}
            quantityAdded={accessoriesAdded}
            amount={currencyFormatter.format(prices.items[$uniqueId]?.total || 0)}
            buttonText={`${t('continue')}`}
            onClick={onClickContinue}
            isLoading={isLoading}
            isButtonDisabled={hasUndefinedLocationAccesory}
            errorMessage={hasUndefinedLocationAccesory && t('location.locationSelectionMissing')}
          />
        )}
        <ConfirmModal
          id={exitModalId}
          confirmChangesTitle={t('confirmChangesTitle')}
          confirmChangesDescription={t('confirmChangesDescription')}
          onConfirmChanges={handleConfirmRemoveChanges}
        />
      </StyledDrawer>
    );
  }
);

export default memo(UpsellModal);
