import theme from '@/theme';
import { Box, styled } from '@mui/material';
import { BookingInformationType } from '@/types/enums';
import DateAndTimeFilters from '@/components/Common/DateAndTimeFilters/DateAndTimeFilters';
import { IDateRangeCalendarInfo } from '@/types/common';
import { useSetBookingQuery } from '@/hooks/queries/BookingQuery/useSetBookingQuery';
import { useIsEditingMode } from '@/hooks/contexts/useIsEditingMode';

const StyledWrapper = styled(Box)`
  ${theme.breakpoints.down('md')} {
    margin-top: 16px;
  }

  ${theme.breakpoints.up('md')} {
    width: 100%;
  }
`;

type Props = {
  baseName: string;
  bookingOption: BookingInformationType;
  isSingleDate: boolean;
  calendarInfo?: IDateRangeCalendarInfo;
  withPrices?: boolean;
  onClickWaitlist?: () => void;
  allowWaitlist?: boolean;
  withDivider?: boolean;
  withLabels?: boolean;
};

const ItemDetailFilters = ({
  baseName,
  bookingOption,
  isSingleDate,
  calendarInfo,
  withPrices,
  onClickWaitlist,
  allowWaitlist,
  withLabels,
  withDivider,
}: Props) => {
  const { handleSetQuery } = useSetBookingQuery({ name: baseName });
  const isEditingMode = useIsEditingMode();

  const handleOnChange = () => {
    if (isEditingMode) return;
    handleSetQuery();
  };

  return (
    <StyledWrapper>
      <DateAndTimeFilters
        name={baseName}
        bookingInformationOption={bookingOption}
        isSingleDate={isSingleDate}
        calendarInfo={calendarInfo}
        withPrices={withPrices}
        allowWaitlist={allowWaitlist}
        onClickSaveInsideCalendar={handleOnChange}
        onClickWaitlist={onClickWaitlist}
        onChangeTimeRange={handleOnChange}
        withLabels={withLabels}
        withDivider={withDivider}
        popperOffset={[-195, -95]}
      />
    </StyledWrapper>
  );
};

export default ItemDetailFilters;
