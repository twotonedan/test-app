import { calculateCalendarPrice } from '@/hooks/contexts/useCalendarSelectionData';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import useSetBookingData from '@/hooks/useSetBookingData';
import theme from '@/theme';
import { IAvailableMultiDate, IAvailableSingleDate } from '@/types/cards';
import { IDateRangeCalendarInfo } from '@/types/common';
import styled from '@emotion/styled';
import { ArrowForward } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { format } from 'date-fns';
import { memo, useMemo } from 'react';

const StyledDateButton = styled(Button)`
  display: flex;
  border-radius: 4px;
  width: fit-content;
  padding: 8px 11px 8px 12px;
  max-height: 32px;
`;

const StyledText = styled('span')`
  font-size: 12px;
  line-height: 16px;
`;

const StyledDateText = styled(StyledText)`
  font-weight: 600;
  color: ${theme.palette.primary.main};
`;

const StyledDivider = styled(Box)`
  height: 16px;
  width: 1px;
  margin-left: 8px;
  margin-right: 8px;
  background-color: ${theme.palette.primary.main};
`;

const StyledPriceText = styled(StyledText)`
  font-weight: 500;
  color: ${theme.palette.customText.secondary};
`;

const FORMAT = 'E, MMM d';

const formatSingleDate = (item: IAvailableSingleDate) => format(new Date(item.date), FORMAT);

const formatMultiDate = (item: IAvailableMultiDate) => {
  const formatedStartDate = format(new Date(item.dateRange.start), FORMAT);
  const formatedEndDate = format(new Date(item.dateRange.end), FORMAT);
  return `${formatedStartDate} - ${formatedEndDate}`;
};

type Props = {
  calendarInfo: IDateRangeCalendarInfo;
  data: IAvailableSingleDate | IAvailableMultiDate;
  formBaseName: string;
  callback?: () => void;
};

const DateSuggestionButton = ({ calendarInfo, data, formBaseName, callback }: Props) => {
  const { handleSetBookingData } = useSetBookingData({ name: formBaseName });

  const { currencyFormatter } = useCurrencyFormatter();
  const isSingleDate = 'date' in data;
  const suggestionLabel = isSingleDate ? formatSingleDate(data) : formatMultiDate(data);

  const { price } = useMemo(() => calculateCalendarPrice(calendarInfo, data), [calendarInfo, data]);

  const handleClick = () => {
    callback?.();
    handleSetBookingData(isSingleDate ? { date: data.date } : { dateRange: data.dateRange });
  };

  return (
    <StyledDateButton variant='outlined' onClick={handleClick} endIcon={<ArrowForward color='secondary' />}>
      <StyledDateText>{suggestionLabel}</StyledDateText>
      <StyledDivider />
      <StyledPriceText>{currencyFormatter.format(price || 0)}</StyledPriceText>
    </StyledDateButton>
  );
};

export default memo(DateSuggestionButton);
