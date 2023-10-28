import { Box, Button, Divider, Snackbar, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { IBookingUnit } from '@/types/bookings';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import BookingUnitTitle from '../BookingUnitTitle/BookingUnitTitle';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
  ${theme.breakpoints.up('md')} {
    padding-top: 24px;
  }
  ${theme.breakpoints.up('lg')} {
    padding-top: 32px;
  }
`;

const StyledGroup = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  min-width: 224px;
`;

const StyledVerticalDivider = styled(Divider)`
  border-color: ${theme.palette.customText.primary};
  height: 8px;
`;

const StyledSnackbar = styled(Snackbar)`
  .MuiAlert-icon {
    margin-right: 4px;
  }
`;

type Props = {
  bookingData: IBookingUnit;
};

const BookingUnitGuests = ({ bookingData }: Props) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const { guests, drivers, actionRequiredItems } = bookingData;

  const actionRequiredItemsSize = useMemo(() => {
    return (actionRequiredItems || []).filter(item => !item.completed).length;
  }, [actionRequiredItems]);

  if (!guests && !drivers && !actionRequiredItems) return null;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <StyledWrapper>
      <Divider />
      <BookingUnitTitle title={t('guests')} url='/' />
      <StyledContent>
        <StyledGroup>
          {guests && (
            <>
              <Typography variant='h4' fontWeight={500}>
                {guests} {t('guests')}
              </Typography>
              <StyledVerticalDivider orientation='vertical' />
            </>
          )}

          {drivers && (
            <>
              <Typography variant='h4' fontWeight={500}>
                {drivers} {t('drivers')}
              </Typography>
              <StyledVerticalDivider orientation='vertical' />
            </>
          )}

          {actionRequiredItems && (
            <Typography variant='h4' fontWeight={500}>
              {actionRequiredItemsSize} {t('pendingTasks')}
            </Typography>
          )}
        </StyledGroup>
        <StyledButton variant='outlined' onClick={() => setOpen(true)}>
          <MailOutlineIcon fontSize='small' />
          {t('bookingUnit.sendReminders')}
        </StyledButton>
      </StyledContent>

      <StyledSnackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert color='success' variant='filled' sx={{ width: '100%' }}>
          <Typography variant='h4' fontWeight={500} color={theme.palette.customColors.white}>
            {t('bookingUnit.remindersSent')}
          </Typography>
        </Alert>
      </StyledSnackbar>
    </StyledWrapper>
  );
};

export default BookingUnitGuests;
