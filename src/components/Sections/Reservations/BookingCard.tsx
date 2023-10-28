import theme from '@/theme';
import { IBooking } from '@/types/bookings';
import { Box, IconButton, Menu, MenuItem, Typography, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { transientOptions } from '@/utils/transientOptions';
import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import BookingUnit from './BookingUnit';

const StyledWrapper = styled(Box, transientOptions)<{ $withPaddingBottom: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  background-color: ${theme.palette.common.white};
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: ${props => (props.$withPaddingBottom ? '16px' : '0')};
  cursor: pointer;

  ${theme.breakpoints.up('lg')} {
    max-width: 70%;
  }
`;

const StyledBookingHeaderWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: ${theme.palette.customColors.lightGray};
  padding: 12px;

  ${theme.breakpoints.up('md')} {
    padding: 16px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 16px 24px;
  }
`;

const StyledTitleWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled(Typography)``;

const StyledBalanceDueWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledBalanceDueText = styled(Typography)`
  color: ${theme.palette.customText.secondary};
`;

const StyledBalanceDueAmount = styled(Typography)`
  color: ${theme.palette.error.main};
  margin-left: 3px;
`;

const StyledPayNowButton = styled(Typography)`
  cursor: pointer;
  margin-left: 12px;
  color: ${theme.palette.primary.main};
`;

const StyledBookingUnitsWrapper = styled(Box)`
  padding: 12px 12px 4px;

  & > *:not(:first-of-type) {
    margin-top: 12px;
  }

  & > *:not(:last-of-type) {
    border-bottom: 1px solid ${theme.palette.customColors.gray};
  }

  ${theme.breakpoints.up('md')} {
    padding: 16px 16px 4px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 16px 24px 12px;
  }
`;

const StyledEditBookingMenu = styled(Menu)`
  & .MuiPaper-root {
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.24);
    border-radius: 8px;

    & li {
      padding: 10px 16px;
      border-radius: 0;
    }

    & li:last-child {
      padding: 16px;
      border-top: 1px solid ${theme.palette.customColors.gray};
    }
  }
`;

const StyledRedTitle = styled(Typography)`
  color: ${theme.palette.error.main};
`;

type Props = {
  bookingData: IBooking;
};

const BookingCard = ({ bookingData }: Props) => {
  const { currencyFormatter } = useCurrencyFormatter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const hasActionRequiredItems = useMemo(() => {
    return bookingData.bookingUnits.some(bookingUnit => bookingUnit?.actionRequiredItems);
  }, [bookingData.bookingUnits]);

  const handleEditBooking = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <StyledWrapper $withPaddingBottom={!hasActionRequiredItems}>
      <StyledBookingHeaderWrapper>
        <StyledTitleWrapper>
          <StyledTitle variant='h2' fontWeight={600}>
            {t('booking')} #{bookingData.id}
          </StyledTitle>
          <IconButton onClick={handleEditBooking}>
            <MoreVertIcon color='secondary' fontSize='small' />
          </IconButton>
        </StyledTitleWrapper>

        {bookingData.balanceDue > 0 && (
          <StyledBalanceDueWrapper>
            <StyledBalanceDueText variant='h4' fontWeight={600}>
              {t('balanceDue')}:
            </StyledBalanceDueText>
            <StyledBalanceDueAmount variant='h4' fontWeight={600}>
              {currencyFormatter.format(bookingData.balanceDue)}
            </StyledBalanceDueAmount>
            <StyledPayNowButton variant='h4' fontWeight={600}>
              {t('payNow')}
            </StyledPayNowButton>
          </StyledBalanceDueWrapper>
        )}
      </StyledBookingHeaderWrapper>

      <StyledBookingUnitsWrapper>
        {bookingData.bookingUnits.map(bookingUnit => (
          <BookingUnit key={bookingUnit.id} bookingUnit={bookingUnit} />
        ))}
      </StyledBookingUnitsWrapper>

      <StyledEditBookingMenu
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}>
        <MenuItem onClick={() => {}}>
          <Typography variant='h4' fontWeight={600}>
            {t('editBooking')}
          </Typography>
        </MenuItem>
        {bookingData.balanceDue > 0 && (
          <MenuItem onClick={() => {}}>
            <Typography variant='h4' fontWeight={600}>
              {t('payBalanceDue')}
            </Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => {}}>
          <Typography variant='h4' fontWeight={600}>
            {t('contactCustomerService')}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <StyledRedTitle variant='h4' fontWeight={600}>
            {t('cancelAllUnits')}
          </StyledRedTitle>
        </MenuItem>
      </StyledEditBookingMenu>
    </StyledWrapper>
  );
};

export default BookingCard;
