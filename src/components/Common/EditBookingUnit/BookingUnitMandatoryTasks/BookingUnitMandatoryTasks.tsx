import { Box, Divider, styled } from '@mui/material';
import theme from '@/theme/theme';
import { IBookingUnit } from '@/types/bookings';
import { useTranslation } from 'next-i18next';

import ActionRequiredList from '@/components/Sections/Reservations/ActionRequiredList';
import BookingUnitTitle from '../BookingUnitTitle/BookingUnitTitle';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 24px;
  ${theme.breakpoints.up('md')} {
    padding-top: 24px;
  }
  ${theme.breakpoints.up('lg')} {
    padding-top: 32px;
  }
`;

const StyledContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 4px;
  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    padding-bottom: 16px;
  }
  ${theme.breakpoints.up('lg')} {
    padding-bottom: 36px;
  }
`;

type Props = {
  bookingData: IBookingUnit;
};

const BookingUnitMandatoryTasks = ({ bookingData }: Props) => {
  const { t } = useTranslation('common');
  const { actionRequiredItems } = bookingData;

  if (!actionRequiredItems) return null;

  return (
    <StyledWrapper>
      <Divider />
      <BookingUnitTitle title={t('mandatoryTasks')} />
      <StyledContent>
        <ActionRequiredList actionRequiredItems={actionRequiredItems} />
      </StyledContent>
      <Divider />
    </StyledWrapper>
  );
};

export default BookingUnitMandatoryTasks;
