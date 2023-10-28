import useFormatDate from '@/components/Common/EditBookingUnit/BookingUnitDescription/useFormatDate';
import theme from '@/theme';
import { IBookingTime } from '@/types/bookings';
import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledDateWrapper = styled(Box)`
  margin-top: 4px;
`;

const StyledDateRow = styled(Box)`
  display: flex;
`;

const StyledDate = styled(Typography)`
  margin-left: 4px;
`;

const StyleDateRangeWrapper = styled(Box)`
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    gap: 8px;
  }
`;

type Props = {
  dateProps: IBookingTime;
};

const BookingTimeLabel = ({ dateProps }: Props) => {
  const { formatDayMonthTime } = useFormatDate();
  const { t } = useTranslation();
  const { singleDate, singleTime, startDate, startTime, endDate, endTime } = dateProps;

  return (
    <StyledDateWrapper>
      {singleDate ? (
        <StyledDateRow>
          <Typography variant='h4' fontWeight={500}>
            {t('date.singleDate')}
          </Typography>
          <StyledDate variant='h4'>{singleDate && formatDayMonthTime(singleDate, singleTime)}</StyledDate>
        </StyledDateRow>
      ) : (
        <StyleDateRangeWrapper>
          <StyledDateRow>
            <Typography variant='h4' fontWeight={500}>
              {t('start')}
            </Typography>
            <StyledDate variant='h4'>{startDate && formatDayMonthTime(startDate, startTime)}</StyledDate>
          </StyledDateRow>
          <StyledDateRow>
            <Typography variant='h4' fontWeight={500}>
              {t('end')}
            </Typography>
            <StyledDate variant='h4'>{endDate && formatDayMonthTime(endDate, endTime)}</StyledDate>
          </StyledDateRow>
        </StyleDateRangeWrapper>
      )}
    </StyledDateWrapper>
  );
};

export default BookingTimeLabel;
