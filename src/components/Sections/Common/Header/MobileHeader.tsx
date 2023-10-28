import { Badge, Drawer, IconButton, styled, SvgIcon, Typography } from '@mui/material';
import { memo, useId, useState } from 'react';
import theme from '@/theme';
import { CartIcon, MenuIcon } from '@/assets';
import { useCartData } from '@/hooks/contexts/useCartData';
import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import Cart from '@/components/Common/Cart';
import NiceModal from '@ebay/nice-modal-react';
import { useTranslation } from 'next-i18next';
import MobileMenu from '@/components/Sections/Common/Header/MobileMenu';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    background-color: ${theme.palette.common.white};
    width: auto;
    border-radius: 0px 0px 16px 16px;
    box-shadow: none;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const StyledBadge = styled(Badge)`
  > .MuiBadge-badge {
    background-color: ${theme.palette.customColors.orangeCarrot};
    color: ${theme.palette.common.white};
    transform: scale(1) translate(0, -40%);
  }
`;

const StyledStickyHeader = styled(StickyHeader)`
  ${theme.mixins.layout};
`;

type Props = {
  className?: string;
};

const MobileHeader = ({ className }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartLength } = useCartData();
  const { t } = useTranslation();
  const id = useId();
  const cartModalId = `cart-${id}`;

  return (
    <>
      <StyledStickyHeader
        className={className}
        leftComponent={
          <>
            <StyledDrawer anchor='top' open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
              <MobileMenu handleClose={() => setIsSidebarOpen(false)} />
            </StyledDrawer>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <SvgIcon component={MenuIcon} inheritViewBox />
            </IconButton>
          </>
        }
        middleComponent={<Typography variant='h1'>{t('postCheckout.myReservations')}</Typography>}
        rightComponent={
          <IconButton onClick={() => NiceModal.show(cartModalId)}>
            <StyledBadge badgeContent={cartLength}>
              <SvgIcon component={CartIcon} inheritViewBox />
            </StyledBadge>
          </IconButton>
        }
      />

      <Cart id={cartModalId} desktopBackText={t('home')} />
    </>
  );
};

export default memo(MobileHeader);
