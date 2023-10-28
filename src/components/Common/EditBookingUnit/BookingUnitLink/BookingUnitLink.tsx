import { useTranslation } from 'next-i18next';
import { Box, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';

import { IBookingUnit } from '@/types/bookings';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
  gap: 4px;
  margin-right: auto;
  ${theme.breakpoints.up('lg')} {
    margin: 0;
    padding: 0;
    max-width: initial;
    width: initial;
  }
`;

type Props = {
  bookingData: IBookingUnit;
  className?: string;
};

const BookingLink = ({ bookingData, className }: Props) => {
  const { t } = useTranslation('common');

  const { id } = bookingData;

  return (
    <StyledWrapper className={className}>
      <Typography variant='h4' fontWeight={600} color={theme.palette.customText.secondary}>
        {t('bookingUnit.linkedTo')}:{' '}
      </Typography>
      <Typography variant='h4' fontWeight={600} color={theme.palette.primary.main}>
        {t('bookingUnit.booking')} #{id}
      </Typography>
    </StyledWrapper>
  );
};

export default BookingLink;
