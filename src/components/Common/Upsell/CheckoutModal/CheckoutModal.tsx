import theme from '@/theme';
import { Drawer, styled, Box, Typography, Button, IconButton } from '@mui/material';
import { Close, CheckCircleOutlineRounded } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import { useRouter } from 'next/router';
import { PageType } from '@/types/enums';
import useToPath from '@/hooks/useToPath';
import useIsMobile from '@/hooks/useIsMobile';
import DummyDesktopHeader from '@/components/Sections/Common/Header/DummyDesktopHeader';

import CartGroupItem from '../../CartGroupItem/CartGroupItem';

const StyledCartDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    max-height: 100%;
    border-radius: 0px 0px 16px 16px;

    ${theme.breakpoints.up('md')} {
      width: 50%;
      min-width: 400px;
      border-radius: 0;
    }

    ${theme.breakpoints.up('lg')} {
      max-width: 533px;
    }
  }
`;

const StyledHeaderContainer = styled(Box)`
  ${theme.mixins.layout}
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;

  ${theme.breakpoints.up('lg')} {
    padding: 25px 24px;
  }
`;

const StyledContentWrapper = styled(Box)`
  width: 100%;
  overflow-y: auto;
  height: 100%;
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

const StyledHeaderTextsContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledActionsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  gap: 8px;
  ${theme.mixins.layout}
  background-color: ${theme.palette.customColors.white};

  ${theme.breakpoints.up('md')} {
    position: sticky;
    bottom: 0;
    padding: 12px 24px;
    padding-bottom: 22px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-size: 14px;
  padding: 14px 20px;
  font-weight: 600;
`;

const StyledCheckCircleOutlineRounded = styled(CheckCircleOutlineRounded)`
  color: ${theme.palette.customColors.lightGreen};
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;

type Props = {
  onRemove: () => void;
};

const CheckoutModal = NiceModal.create(({ onRemove }: Props) => {
  const { t } = useTranslation('common');
  const isMobile = useIsMobile();

  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal, { onRemove });
  const router = useRouter();

  const { prices } = useCalculatePrice();
  const { toPath: checkoutPath } = useToPath({ pageType: PageType.CHECKOUT });

  const {
    $uniqueId,
    handleAddItemQuantity,
    handleRemoveItemQuantity,
    handleAddAccessoryQuantity,
    handleRemoveAccessoryQuantity,
  } = useCurrentCartItem();

  const handleOpenNextPage = () => {
    handleOnClose();
    onRemove();
    router.push({ pathname: checkoutPath() });
  };

  return (
    <StyledCartDrawer anchor={isMobile ? 'top' : 'right'} open={isOpen} onClose={handleOnClose}>
      <DummyDesktopHeader />
      <StyledHeaderContainer>
        <StyledHeaderTextsContainer>
          <StyledCheckCircleOutlineRounded />
          <StyledTypography>{`${t('itemAdded')}`}</StyledTypography>
        </StyledHeaderTextsContainer>
        <IconButton onClick={handleOnClose}>
          <Close />
        </IconButton>
      </StyledHeaderContainer>
      <StyledContentWrapper>
        <CartGroupItem
          items={prices.items[$uniqueId] ? [prices.items[$uniqueId]] : []}
          onClickAddItem={handleAddItemQuantity}
          onClickRemoveItem={handleRemoveItemQuantity}
          onClickAddAccessory={handleAddAccessoryQuantity}
          onClickRemoveAccessory={handleRemoveAccessoryQuantity}
          onCloseModal={handleOnClose}
        />
      </StyledContentWrapper>
      <StyledActionsContainer>
        <StyledButton variant='outlined' onClick={handleOnClose}>
          {`${t('continueShopping')}`}
        </StyledButton>
        <StyledButton onClick={handleOpenNextPage} variant='contained'>{`${t('checkOut.title')}`}</StyledButton>
      </StyledActionsContainer>
    </StyledCartDrawer>
  );
});

export default CheckoutModal;
