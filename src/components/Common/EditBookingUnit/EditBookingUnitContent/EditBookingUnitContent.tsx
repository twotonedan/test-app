import { useTranslation } from 'next-i18next';
import { Box, SvgIcon, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import RecommendedItems from '@/components/Sections/Common/RecommendedItems/RecommendedItems';
import useGetRelatedItems from '@/hooks/api/useGetRelatedItems';
import { ArrowBackIos } from '@mui/icons-material';
import Link from 'next/link';

import { IBookingUnit } from '@/types/bookings';
import BookingUnitLink from '../BookingUnitLink/BookingUnitLink';
import BookingUnitDescription from '../BookingUnitDescription/BookingDescription';
import ImagesSwiper from '../../ImagesSwiper/ImagesSwiper';
import ImagesCarousel from '../../ImagesCarousel/ImagesCarousel';
import BookingUnitAccessories from '../BookingUnitAccessories/BookingUnitAccessories';
import BookingUnitGuests from '../BookingUnitGuests';
import BookingUnitMandatoryTasks from '../BookingUnitMandatoryTasks';

const StyledMobileItemWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledBookingUnitLinkMobile = styled(BookingUnitLink)`
  display: flex;
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledBookingUnitLinkDesktop = styled(BookingUnitLink)`
  display: none;
  ${theme.breakpoints.up('lg')} {
    display: flex;
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

const StyledItemWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: none;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
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

const StyledDesktopBackButton = styled(Link)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
    text-decoration: none;
    gap: 24px;
    margin-top: 32px;
    margin-bottom: 32px;
    cursor: pointer;

    svg {
      color: ${theme.palette.customText.primary};
    }
  }
`;

const StyledSubWrapper = styled(Box)`
  display: flex;
  gap: 24px;
`;

const StyledRecommendedItemsWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
  min-height: 330px;
  ${theme.breakpoints.up('lg')} {
    min-height: 400px;
  }
`;

const StyledRecommendedItems = styled(RecommendedItems)`
  ${theme.mixins.layout}
  margin-top: 24px;
`;

const StyledBookingHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  bookingData: IBookingUnit;
};

const EditBookingUnitContent = ({ bookingData }: Props) => {
  const { t } = useTranslation('common');

  const { imagesDetail, id, title } = bookingData;
  const { data: relatedItems = [] } = useGetRelatedItems();

  return (
    <>
      <StyledBookingUnitLinkMobile bookingData={bookingData} />
      <StyledMobileItemWrapper>
        <StyledSwiperImagesMobile images={imagesDetail} smallView />
        <BookingUnitDescription bookingData={bookingData} />
      </StyledMobileItemWrapper>

      <StyledItemWrapper>
        <StyledBookingHeader>
          <StyledDesktopBackButton href='/'>
            <SvgIcon component={ArrowBackIos} />
            <Typography variant='h3' fontWeight={600}>
              {`${t('bookingUnit.myReservations')} / ${t('bookingUnit.booking')} #${id} / ${title}`}
            </Typography>
          </StyledDesktopBackButton>
          <StyledBookingUnitLinkDesktop bookingData={bookingData} />
        </StyledBookingHeader>

        <StyledSubWrapper>
          <StyledSwiperImagesMobile images={imagesDetail} smallView />
          <StyledCarouselImagesDesktop images={imagesDetail} maxImages={3} width={421} height={290} smallGap />

          <StyledDesktopRightWrapper>
            <BookingUnitDescription bookingData={bookingData} />
          </StyledDesktopRightWrapper>
        </StyledSubWrapper>
      </StyledItemWrapper>
      <BookingUnitAccessories bookingData={bookingData} />
      <BookingUnitGuests bookingData={bookingData} />
      <BookingUnitMandatoryTasks bookingData={bookingData} />

      <StyledRecommendedItemsWrapper>
        <StyledRecommendedItems smallView title={t('bookingUnit.addToYourOrder')} items={relatedItems} />
      </StyledRecommendedItemsWrapper>
    </>
  );
};

export default EditBookingUnitContent;
