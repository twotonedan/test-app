import { useTranslation } from 'next-i18next';
import { Box, Divider, styled } from '@mui/material';
import theme from '@/theme/theme';

import { IBookingUnit } from '@/types/bookings';
import BookingUnitAccessory from '../BookingUnitAccessory/BookingUnitAccessory';
import BookingUnitTitle from '../BookingUnitTitle/BookingUnitTitle';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 12px;
  ${theme.breakpoints.up('md')} {
    padding-top: 24px;
  }
  ${theme.breakpoints.up('lg')} {
    padding-top: 32px;
  }
`;

const StyledListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  ${theme.breakpoints.up('lg')} {
    max-width: 645px;
  }
`;

type Props = {
  bookingData: IBookingUnit;
};

const LIGHT_GRAY = theme.palette.customColors.lightGray;
const SMOOTH_GRAY = theme.palette.customColors.smoothGray;

const BookingUnitAccessories = ({ bookingData }: Props) => {
  const { t } = useTranslation('common');

  const { accessories } = bookingData;

  if (!accessories) return null;

  return (
    <StyledWrapper>
      <Divider />
      <BookingUnitTitle title={t('accessories')} url='/' />
      <StyledListContainer>
        {accessories.map((accessory, index) => {
          const color = index % 2 === 0 ? LIGHT_GRAY : SMOOTH_GRAY;
          return (
            <BookingUnitAccessory
              key={accessory.id}
              firstRounded={index === 0}
              lastRounded={accessories.length - 1 === index}
              color={color}
              accessory={accessory}
            />
          );
        })}
      </StyledListContainer>
    </StyledWrapper>
  );
};

export default BookingUnitAccessories;
