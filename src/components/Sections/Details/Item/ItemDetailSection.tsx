import { useTranslation } from 'next-i18next';
import { Box, SvgIcon, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import BookingButtons from '@/components/BookingButtons';
import ItemDetailFilters from '@/components/Sections/ItemDetailFilters';
import { useCalendarSelectionData } from '@/hooks/contexts/useCalendarSelectionData';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import useAddToCart from '@/hooks/useAddToCart';
import { AccessoryData } from '@/hooks/contexts/useCartData';
import { BookingInformationType, CheckoutMethod } from '@/types/enums';
import { ICardPayload } from '@/types/cards';
import { IQuantityLimits } from '@/types/common';
import RecommendedItems from '@/components/Sections/Common/RecommendedItems/RecommendedItems';
import useGetRelatedItems from '@/hooks/api/useGetRelatedItems';
import FormQuantityCounter from '@/components/Common/FormQuantityCounter/FormQuantityCounter';
import useCheckoutLabel from '@/hooks/useCheckoutLabel';
import { useIsEditingMode } from '@/hooks/contexts/useIsEditingMode';
import { ArrowBackIos } from '@mui/icons-material';
import Link from 'next/link';

import ImagesSwiper from '@/components/Common/ImagesSwiper/ImagesSwiper';
import ImagesCarousel from '@/components/Common/ImagesCarousel/ImagesCarousel';
import ItemDetailTitle from './ItemDetailTitle';
import ItemDetailDescription from './ItemDetailDescription';
import ItemDetailAmenities from './ItemDetailAmenities';

const StyledMobileItemWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledItemWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: none;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledTabletItemDetailTitle = styled(ItemDetailTitle)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledDesktopRightWrapper = styled(Box)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const StyledDesktopItemDetailTitle = styled(ItemDetailTitle)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;

    .itemDetail-title {
      font-size: 32px;
      line-height: 38px;
      max-width: 75%;
    }

    .itemDetail-subtitle {
      font-size: 24px;
      font-weight: 600;
      line-height: 30px;
    }
  }
`;

const StyledDesktopBackButton = styled(Link)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
    text-decoration: none;
    gap: 24px;
    margin-top: 34px;
    margin-bottom: 24px;
    cursor: pointer;

    svg {
      color: ${theme.palette.customText.primary};
    }
  }
`;

const StyledSubWrapper = styled(Box)`
  display: flex;
  gap: 24px;

  ${theme.breakpoints.up('lg')} {
    gap: 32px;
  }
`;

const StyledBorderedBooking = styled(Box)`
  padding: 16px;
  border: 1px solid ${theme.palette.customColors.lightGray};
  box-shadow: 0px 1px 4px rgba(42, 51, 60, 0.16);
  border-radius: 16px;
`;

const StyledPriceWrapper = styled(Box)`
  display: flex;
  align-items: center;
  height: 32px;
  margin-top: 60px;
  margin-bottom: 16px;
  justify-content: space-between;

  & > div:first-of-type {
    width: 88px;
  }
`;

const StyledSwiperImagesMobile = styled(ImagesSwiper)`
  display: initial;
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledCarouselImagesDesktop = styled(ImagesCarousel)`
  display: none;
  ${theme.breakpoints.up('lg')} {
    display: initial;
  }
`;

const StyledRecommendedItemsWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
`;

const StyledRecommendedItems = styled(RecommendedItems)`
  ${theme.mixins.layout}
  margin-top: 24px;
`;

type ItemDetailSectionProps = {
  id: string;
  cardData: ICardPayload;
  baseName: string;
  bookingInformationFormat: BookingInformationType;
  isMultiDay: boolean;
  handleClickWaitlist: () => void;
  limits?: IQuantityLimits;
  defaultAccessories: AccessoryData[];
  checkoutMethod: CheckoutMethod;
  onClickConfirm?: (uniqueId: string) => void;
  onClickWaitlist?: () => void;
};

const ItemDetailSection = ({
  id,
  cardData,
  baseName,
  bookingInformationFormat,
  isMultiDay,
  handleClickWaitlist,
  limits = { min: 1, max: 5 },
  defaultAccessories,
  checkoutMethod,
  onClickConfirm,
  onClickWaitlist,
}: ItemDetailSectionProps) => {
  const { t } = useTranslation('common');
  const isEditingMode = useIsEditingMode();

  const { title, amenities, description, imagesDetail, tagline, calendarInfo } = cardData;
  const { currencyFormatter } = useCurrencyFormatter();
  const { price, isUnavailable } = useCalendarSelectionData();
  const { data: relatedItems = [] } = useGetRelatedItems();
  const { handleOnClickConfirm, isSubmitDisabled } = useAddToCart({
    isEditingMode,
    itemId: id,
    defaultAccessories,
    formBaseName: baseName,
    onClickConfirm,
    resetQueryParam: true,
  });
  const checkoutButtonLabel = useCheckoutLabel(checkoutMethod);

  return (
    <>
      <StyledMobileItemWrapper>
        <ImagesSwiper images={imagesDetail} />
        <ItemDetailTitle itemName={title} tagline={tagline} />
        <ItemDetailFilters
          baseName={baseName}
          bookingOption={bookingInformationFormat}
          isSingleDate={!isMultiDay}
          calendarInfo={calendarInfo}
          onClickWaitlist={handleClickWaitlist}
          withLabels
        />
      </StyledMobileItemWrapper>

      <StyledItemWrapper>
        <StyledTabletItemDetailTitle itemName={title} tagline={tagline} />
        <StyledDesktopBackButton href='/'>
          <SvgIcon component={ArrowBackIos} />
          <Typography variant='h3' fontWeight={600}>
            {t('backToHome')}
          </Typography>
        </StyledDesktopBackButton>
        <StyledSubWrapper>
          <StyledSwiperImagesMobile images={imagesDetail} />
          <StyledCarouselImagesDesktop images={imagesDetail} width={643} height={504} />

          <StyledDesktopRightWrapper>
            <StyledDesktopItemDetailTitle itemName={title} tagline={tagline} />
            <StyledBorderedBooking>
              <ItemDetailFilters
                baseName={baseName}
                bookingOption={bookingInformationFormat}
                isSingleDate={!isMultiDay}
                calendarInfo={calendarInfo}
                onClickWaitlist={handleClickWaitlist}
                withLabels
                withDivider
              />
              <StyledPriceWrapper>
                <FormQuantityCounter name={`${baseName}.quantity`} limits={limits} />
                <Typography fontWeight={600} fontSize={20} lineHeight='26px'>
                  {!isUnavailable && price ? currencyFormatter.format(price) : '--'}
                </Typography>
              </StyledPriceWrapper>
              <BookingButtons
                isUnavailable={isUnavailable}
                isDisabled={!isUnavailable && isSubmitDisabled}
                onMainButtonClick={handleOnClickConfirm}
                mainButtonLabel={!isEditingMode ? checkoutButtonLabel : t('actions:updateCartItem')}
                onClickWaitlist={onClickWaitlist}
                isDisabledMainButton={isUnavailable || isSubmitDisabled}
              />
            </StyledBorderedBooking>
          </StyledDesktopRightWrapper>
        </StyledSubWrapper>
      </StyledItemWrapper>

      {amenities && <ItemDetailAmenities amenities={amenities} />}
      <ItemDetailDescription description={description} cardData={cardData} />
      <StyledRecommendedItemsWrapper>
        <StyledRecommendedItems title={t('basedOnThisItem')} items={relatedItems} />
      </StyledRecommendedItemsWrapper>
    </>
  );
};

export default ItemDetailSection;
