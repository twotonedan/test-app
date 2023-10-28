import { IBookingUnit } from '@/types/bookings';
import { Box, IconButton, Typography, styled } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { TagColor } from '@/types/enums';
import { transientOptions } from '@/utils/transientOptions';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import BookingTimeLabel from './BookingTimeLabel';
import BookingActionRequiredAccordion from './BookingActionRequiredAccordion';
import ActionRequiredItem from './ActionRequiredItem';

const StyledTopWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitleWrapper = styled(Box)`
  display: flex;
  gap: 8px;
`;

const StyledTag = styled(Box, transientOptions)<{ $backgroundColor: TagColor }>`
  background: ${props => props.$backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  padding: 3px 8px;
  max-height: 24px;
`;

const StyledTagLabel = styled(Typography)`
  color: ${theme.palette.common.white};
`;

const StyledMobileBookingActionRequiredAccordion = styled(BookingActionRequiredAccordion)`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledActionRequiredWrapper = styled(Box)`
  display: none;
  ${theme.breakpoints.up('md')} {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
  }
`;

const StyledActionRequiredLabel = styled(Typography)`
  color: ${theme.palette.customText.secondary};
`;

const StyledButtonsWrapper = styled(Box)`
  display: flex;
  gap: 12px;
`;

type Props = {
  bookingUnit: IBookingUnit;
};

const BookingUnit = ({ bookingUnit }: Props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <StyledTopWrapper>
        <StyledTitleWrapper>
          <Typography variant='h3' fontWeight={600}>
            {bookingUnit.title}
          </Typography>
          <StyledTag $backgroundColor={bookingUnit.status.color}>
            <StyledTagLabel variant='subtitle2'>{t(bookingUnit.status.label)}</StyledTagLabel>
          </StyledTag>
        </StyledTitleWrapper>
        <IconButton onClick={() => {}}>
          <EditOutlinedIcon color='secondary' fontSize='small' />
        </IconButton>
      </StyledTopWrapper>
      <BookingTimeLabel dateProps={bookingUnit.bookingTime} />
      {bookingUnit.actionRequiredItems && (
        <>
          <StyledMobileBookingActionRequiredAccordion actionRequiredItems={bookingUnit.actionRequiredItems} />
          <StyledActionRequiredWrapper>
            <StyledActionRequiredLabel variant='h4' fontWeight={500}>
              {t('actionRequired')} ({bookingUnit.actionRequiredItems.length})
            </StyledActionRequiredLabel>
            <StyledButtonsWrapper>
              {bookingUnit.actionRequiredItems.map(item => (
                <ActionRequiredItem actionRequiredItem={item} key={`${item.name}-${item.link}`} />
              ))}
            </StyledButtonsWrapper>
          </StyledActionRequiredWrapper>
        </>
      )}
    </Box>
  );
};

export default BookingUnit;
