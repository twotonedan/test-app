import { Badge, Box, Drawer, IconButton, styled, SvgIcon, SwipeableDrawer, Typography } from '@mui/material';
import { memo, useEffect, useId, useState } from 'react';
import theme from '@/theme';
import { CartIcon, MenuIcon } from '@/assets';
import useGetCategorySelected from '@/hooks/useGetCategorySelected';
import { ExpandMoreRounded } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { transientOptions } from '@/utils/transientOptions';
import Image from 'next/image';
import { CategoryType } from '@/types/enums';
import { useCartData } from '@/hooks/contexts/useCartData';
import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import useGetCompany from '@/hooks/api/useGetCompany';
import useGetFeed from '@/hooks/api/useGetFeed';
import Cart from '@/components/Common/Cart';
import NiceModal from '@ebay/nice-modal-react';
import { useTranslation } from 'next-i18next';

import CategoriesSlider from '../../Home/CategoriesSlider';
import MobileMenu from './MobileMenu';

const drawerBleeding = 20;

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

const StyledLogoWrapper = styled(Image)`
  margin: 0 auto;
  object-fit: contain;
  object-position: center;
`;

const StyledCategoryWrapper = styled(IconButton)`
  ${theme.mixins.resetButton}
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const StyledCategoryTitle = styled(Typography)`
  color: ${theme.palette.customColors.steelBlue};
`;

const StyledIconWrapper = styled(Box, transientOptions)<{ $rotate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: -4px;
  ${props => props.$rotate && 'transform: rotate(180deg);'}
  transition: transform ease-out 0.1s;
`;

const StyledCategoryDrawer = styled(SwipeableDrawer, transientOptions)<{ $height: number }>`
  z-index: 2;
  position: absolute;

  & > .MuiPaper-root {
    height: 200px;
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const StyledBadge = styled(Badge)`
  > .MuiBadge-badge {
    background-color: ${theme.palette.customColors.orangeCarrot};
    color: ${theme.palette.common.white};
    transform: scale(1) translate(0, -40%);
  }
`;

const StyledCategoriesSlider = styled(CategoriesSlider)`
  margin-bottom: 28px;
`;

const MotionCategoriesSlider = motion(CategoriesSlider);
const StyledMotionCategoriesSlider = styled(MotionCategoriesSlider)`
  display: block;

  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledStickyHeader = styled(StickyHeader)`
  ${theme.mixins.layout};
`;

type Props = {
  className?: string;
};

const MobileFeedHeader = ({ className }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { data: feedData } = useGetFeed();
  const { data: companyData } = useGetCompany();
  const { cartLength } = useCartData();
  const { categorySelected } = useGetCategorySelected();
  const { t } = useTranslation();
  const id = useId();
  const cartModalId = `cart-${id}`;

  const isCategoryAllSelected = categorySelected === CategoryType.ALL;

  useEffect(() => {
    if (!isCategoryAllSelected) return;
    setIsOpenDrawer(false);
  }, [isCategoryAllSelected]);

  return (
    <>
      <StyledStickyHeader
        className={className}
        leftComponent={
          !isOpenDrawer && (
            <>
              <StyledDrawer anchor='top' open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
                <MobileMenu handleClose={() => setIsSidebarOpen(false)} />
              </StyledDrawer>
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <SvgIcon component={MenuIcon} inheritViewBox />
              </IconButton>
            </>
          )
        }
        middleComponent={
          isCategoryAllSelected ? (
            companyData?.logo && <StyledLogoWrapper src={companyData.logo} alt='logo' width={141} height={40} />
          ) : (
            <StyledCategoryWrapper disableRipple onClick={() => setIsOpenDrawer(!isOpenDrawer)}>
              <StyledCategoryTitle variant='h1'>
                {feedData?.categories.find(v => v.type === categorySelected)?.name}
              </StyledCategoryTitle>
              <StyledIconWrapper $rotate={isOpenDrawer}>
                <ExpandMoreRounded sx={{ color: theme.palette.customColors.steelBlue }} />
              </StyledIconWrapper>
            </StyledCategoryWrapper>
          )
        }
        rightComponent={
          !isOpenDrawer && (
            <IconButton onClick={() => NiceModal.show(cartModalId)}>
              <StyledBadge badgeContent={cartLength}>
                <SvgIcon component={CartIcon} inheritViewBox />
              </StyledBadge>
            </IconButton>
          )
        }
      />

      <Cart id={cartModalId} desktopBackText={t('home')} />
      <StyledCategoryDrawer
        $height={drawerBleeding}
        anchor='top'
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        onOpen={() => setIsOpenDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen
        ModalProps={{ keepMounted: true }}>
        <StyledCategoriesSlider
          name='filters'
          categorySelected={categorySelected}
          onCategoryChange={() => setIsOpenDrawer(false)}
        />
      </StyledCategoryDrawer>
      <AnimatePresence>
        {isCategoryAllSelected && (
          <StyledMotionCategoriesSlider
            initial={{ height: !isOpenDrawer ? 'auto' : 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            name='filters'
            categorySelected={categorySelected}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(MobileFeedHeader);
