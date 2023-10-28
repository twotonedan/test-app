import DateFilters from '@/components/Sections/Common/DateFilters/DateFilters';
import { IDateRangeCalendarInfo } from '@/types/common';
import { Box, Divider, styled } from '@mui/material';
import { BookingInformationType } from '@/types/enums';
import BookingComponent from '../BookingComponent';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

type Props = {
  name: string;
  isSingleDate: boolean;
  calendarInfo?: IDateRangeCalendarInfo;
  bookingInformationOption: BookingInformationType;
  withPrices?: boolean;
  onClickSaveInsideCalendar?: () => void;
  onClickWaitlist?: () => void;
  onChangeTimeRange?: () => void;
  allowWaitlist?: boolean;
  withLabels?: boolean;
  withDivider?: boolean;
  popperOffset?: [number, number];
};

const DateAndTimeFilters = ({
  name,
  isSingleDate,
  calendarInfo,
  bookingInformationOption,
  withPrices,
  allowWaitlist,
  onClickSaveInsideCalendar,
  onClickWaitlist,
  onChangeTimeRange,
  withLabels,
  withDivider = false,
  popperOffset,
}: Props) => {
  const fieldsToValidate = [`${name}.timeRange`, `${name}.dateRange`, `${name}.date`];

  return (
    <StyledWrapper>
      <DateFilters
        name={name}
        defaultIsMultiDay={!isSingleDate}
        calendarInfo={calendarInfo}
        withPrices={withPrices}
        onClickSaveInsideCalendar={onClickSaveInsideCalendar}
        onClickWaitlist={onClickWaitlist}
        allowWaitlist={allowWaitlist}
        withDateLabel={withLabels}
        popperOffset={popperOffset}
      />
      {withDivider && <Divider />}
      <BookingComponent
        type={bookingInformationOption}
        name={`${name}.timeRange`}
        validateFields={fieldsToValidate}
        withHourLabel={withLabels}
        onChange={onChangeTimeRange}
      />
    </StyledWrapper>
  );
};

export default DateAndTimeFilters;
