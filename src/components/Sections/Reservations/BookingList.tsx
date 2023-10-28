import { Box, Typography, styled } from '@mui/material';
import { IBooking } from '@/types/bookings';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';

import BookingCard from './BookingCard';

const StyledWrapper = styled(Box)`
  ${theme.breakpoints.down('lg')} {
    ${theme.mixins.layout}
  }

  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
`;

type Props = {
  bookingsList: IBooking[];
};

const BookingList = ({ bookingsList }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      {bookingsList.length > 0 ? (
        bookingsList.map(booking => <BookingCard key={booking.id} bookingData={booking} />)
      ) : (
        <Typography>{t('noBookingsFound')}</Typography>
      )}
    </StyledWrapper>
  );
};

export default BookingList;
