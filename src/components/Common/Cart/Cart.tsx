import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Drawer, SvgIcon, Typography, styled } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import useToPath from '@/hooks/useToPath';
import { PageType } from '@/types/enums';
import { useRouter } from 'next/router';
import theme from '@/theme/theme';
import { ArrowBackIos, ShoppingBagOutlined } from '@mui/icons-material';
import useGetFeedQuery from '@/hooks/queries/FeedQuery/useGetFeedQuery';
import { commonQueryParamConfigMap } from '@/hooks/queries/useQuery';
import { useCartData } from '@/hooks/contexts/useCartData';
import RecommendedItems from '@/components/Sections/Common/RecommendedItems/RecommendedItems';
import useGetAddonsItems from '@/hooks/api/useGetAddons';
import { extractFeedFilters } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import useShouldPopulateLS from '@/hooks/localStorage/useShouldPopulateLS';
import useIsMobile from '@/hooks/useIsMobile';
import DetailFooter from '@/components/Sections/Common/DetailFooter/DetailFooter';
import DummyDesktopHeader from '@/components/Sections/Common/Header/DummyDesktopHeader';

import Subheader from './Subheader';
import CardsContainer from './CardsContainer';
import EmptyState from '../OtherDatesList/ShowMore/AvailableDatesDrawer/EmptyState';
import CartFooter from './CartFooter/CartFooter';
import PromoCode from './PromoCode/PromoCode';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

const StyledDetailHeader = styled(DetailHeader)`
  display: block;

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

const SyledEmptyStateWrapper = styled(Box)`
  ${theme.mixins.layout}
  height: 100%;
  padding-bottom: 30px;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledEmptyState = styled(EmptyState)`
  margin: 0;
`;

const StyledRecommendedItemsWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
  flex-shrink: 0;
`;

const StyledRecommendedItems = styled(RecommendedItems)`
  ${theme.mixins.layout}
  ${theme.breakpoints.up('md')} {
    margin-top: 40px;
  }
`;

type Props = {
  desktopBackText: string;
};

const Cart = NiceModal.create(({ desktopBackText }: Props) => {
  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const { t } = useTranslation('common');
  const { currencyFormatter } = useCurrencyFormatter();
  const { prices, isLoading } = useCalculatePrice();
  const { parsedQuery } = useGetFeedQuery();
  const { toPath: toPathFeed } = useToPath({ pageType: PageType.INDEX, paramConfigMap: commonQueryParamConfigMap });
  const { toPath } = useToPath({ pageType: PageType.CHECKOUT });
  const { push } = useRouter();
  const { cartData } = useCartData();
  const { data: addonsItems = [] } = useGetAddonsItems();
  const isMobile = useIsMobile();

  const handleRedirect = (cb: () => void) => {
    cb();
    handleOnClose();
  };

  const { setShouldPopulateLS } = useShouldPopulateLS();

  return (
    <StyledDrawer open={isOpen} anchor='right'>
      <StyledDetailHeader onClickBack={handleOnClose} title={t('cart')} />
      <DummyDesktopHeader withShadow />
      <StyledBackButton onClick={handleOnClose}>
        <SvgIcon component={ArrowBackIos} />
        <Typography variant='h3' fontWeight={600}>
          {t('backTo')} {desktopBackText}
        </Typography>
      </StyledBackButton>
      {cartData.length ? (
        <>
          <Subheader />
          <CardsContainer onClose={handleOnClose} />
          {isMobile && <PromoCode />}
          <StyledRecommendedItemsWrapper>
            <StyledRecommendedItems
              title={t('recommendedAddons')}
              items={addonsItems}
              onClick={() => {
                setShouldPopulateLS(true);
                handleOnClose();
              }}
            />
          </StyledRecommendedItemsWrapper>
          {isMobile ? (
            <DetailFooter
              title={`${t('common:total')}`}
              amount={currencyFormatter.format(prices.total)}
              buttonText={`${t('common:checkOut.title')}`}
              onClick={() => handleRedirect(() => push({ pathname: toPath() }))}
              isLoading={isLoading}
            />
          ) : (
            <CartFooter
              amount={currencyFormatter.format(prices.total)}
              onClick={() => handleRedirect(() => push({ pathname: toPath() }))}
              isLoading={isLoading}
            />
          )}
        </>
      ) : (
        <SyledEmptyStateWrapper>
          <StyledEmptyState
            icon={<ShoppingBagOutlined sx={{ fontSize: '80px', color: '#CACACA' }} />}
            title={t('emptyCart')}
            subTitle={t('noProductsOnCart')}
            buttonLabel={t('backHome')}
            onButtonClick={() => handleRedirect(() => push({ pathname: toPathFeed(extractFeedFilters(parsedQuery)) }))}
          />
        </SyledEmptyStateWrapper>
      )}
    </StyledDrawer>
  );
});

export default memo(Cart);
