import { useTranslation } from 'next-i18next';
import { Box, Chip, IconButton, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IBookingUnit } from '@/types/bookings';
import { transientOptions } from '@/utils/transientOptions';
import { useMemo } from 'react';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import BookingLocation from '../BookingLocation/BookingLocation';
import useFormatDate from './useFormatDate';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 8px;
  ${theme.breakpoints.up('lg')} {
    gap: 12px;
  }
`;

const StyledGroup = styled(Box)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledDesktopTitle = styled(Box)`
  display: none;
  ${theme.breakpoints.up('lg')} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledRow = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    gap: 12px;
  }
`;

const StyledChip = styled(Chip, transientOptions)<{ $color?: string }>`
  background-color: ${props => props.$color};
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 24px;
  width: 46px;

  & .MuiChip-label {
    padding: 0;
  }
`;

type Props = {
  bookingData: IBookingUnit;
};

const BookingDescription = ({ bookingData }: Props) => {
  const { t } = useTranslation('common');
  const { currencyFormatter } = useCurrencyFormatter();
  const { formatDayMonthTime } = useFormatDate();

  const {
    title,
    status: { label, color },
    bookingTime: { startDate, endDate, startTime, endTime, singleDate, singleTime },
    locationName,
    price,
  } = bookingData;

  const chipLabel = useMemo(
    () => (
      <Typography variant='subtitle2' color={theme.palette.customColors.white}>
        {`${label.toString().charAt(0).toUpperCase()}${label.toString().slice(1).toLocaleLowerCase()}`}
      </Typography>
    ),
    [label]
  );

  return (
    <StyledWrapper>
      <StyledDesktopTitle>
        <Typography fontSize={32} fontWeight={600} lineHeight={1}>
          {title}
        </Typography>
        <IconButton color='primary'>
          <MoreVertIcon />
        </IconButton>
      </StyledDesktopTitle>
      <StyledChip $color={color} label={chipLabel} />
      <StyledRow>
        {singleDate && (
          <StyledGroup>
            <Typography variant='subtitle1' fontWeight={500}>
              {t('date.singleDate')}
            </Typography>
            <Typography variant='subtitle1'>{singleDate && formatDayMonthTime(singleDate, singleTime)}</Typography>
          </StyledGroup>
        )}
        {startDate && endDate && (
          <>
            <StyledGroup>
              <Typography variant='subtitle1' fontWeight={500}>
                {t('bookingUnit.start')}
              </Typography>
              <Typography variant='subtitle1'>{startDate && formatDayMonthTime(startDate, startTime)}</Typography>
            </StyledGroup>
            <StyledGroup>
              <Typography variant='subtitle1' fontWeight={500}>
                {t('bookingUnit.end')}
              </Typography>
              <Typography variant='subtitle1'>{endDate && formatDayMonthTime(endDate, endTime)}</Typography>
            </StyledGroup>
          </>
        )}
      </StyledRow>

      <BookingLocation locationName={locationName} />
      <Typography fontSize={16} fontWeight={600} textAlign='right'>
        {currencyFormatter.format(price)}
      </Typography>
    </StyledWrapper>
  );
};

export default BookingDescription;
