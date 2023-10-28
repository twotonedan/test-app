import useTwoDigitsFormatDate, { DateOrDateRange } from '@/hooks/formatters/useTwoDigitsFormatDate';
import { IDateRange } from '@/types/common';
import { BookingInformationType } from '@/types/enums';
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import {
  BookingTimeRangeSchema,
  BookingTimeRangeSchemaDuration,
} from '@/validationSchemas/bookingInformationSchema/timeRange';
import { TimeRangeSchemaCustomRange } from '@/validationSchemas/common/timeRange';
import { Box, Typography, styled } from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { pluralize } from '@/utils/pluralize';
import { useMemo } from 'react';
import theme from '@/theme/theme';
import useFormatHours from '@/hooks/formatters/useFormatHours';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 80%;
    margin-bottom: 5px;
  }
`;

const StyledLabel = styled(Typography)`
  text-transform: lowercase;
  font-size: 14px;
  line-height: 20px;

  ${theme.breakpoints.up('md')} {
    &:nth-of-type(2) {
      margin-right: 10px;
    }
  }

  ${theme.breakpoints.up('lg')} {
    font-size: 16px;
  }
`;

const StyledLabelBold = styled(StyledLabel)`
  font-weight: 500;
  text-transform: unset;

  ${theme.breakpoints.up('lg')} {
    font-size: 16px;
  }
`;

const StyledInfoLine = styled(Box)`
  display: flex;
  align-items: flex-end;
  grid-gap: 5px;
  width: max-content;
`;

type Props = {
  bookingInformation: IBookingInformation;
};

const getDataFromCommonTimeRange = (obj: BookingTimeRangeSchema) => {
  const data = obj.value as TimeRangeSchemaCustomRange;
  const duration = (data.end as number) - (data.start as number);
  return { duration, pickUp: data.start, dropOff: data.end };
};

const dataFromTimeRange: {
  [k in BookingInformationType]: (timeRange: BookingTimeRangeSchema) => {
    duration: number;
    pickUp: number | string | null;
    dropOff: number | string | null;
  };
} = {
  [BookingInformationType.CUSTOM_RANGE]: getDataFromCommonTimeRange,
  [BookingInformationType.PREDEFINED]: getDataFromCommonTimeRange,
  [BookingInformationType.DURATION]: (obj: BookingTimeRangeSchema) => {
    const { duration, range } = obj.value as BookingTimeRangeSchemaDuration;
    return { duration: duration || 0, pickUp: range.start, dropOff: range.end };
  },
};

const getDataFromTimeRange = (
  timeRange?: BookingTimeRangeSchema
): {
  duration?: number;
  pickUp?: number | string | null;
  dropOff?: number | string | null;
} => (timeRange?.type ? dataFromTimeRange[timeRange.type](timeRange) : {});

const getDateRangeDuration = (dateRange: IDateRange) => differenceInCalendarDays(dateRange?.end, dateRange?.start);

const CartInfo = ({ bookingInformation }: Props) => {
  const { date, dateRange, timeRange } = bookingInformation;
  const isMultiDay = !!bookingInformation.dateRange;
  const { t } = useTranslation('common');
  const { formatDates } = useTwoDigitsFormatDate();
  const { formatHours } = useFormatHours();
  const formattedDate = formatDates((date || dateRange) as DateOrDateRange);
  const { duration: singleDayDuration, pickUp, dropOff } = getDataFromTimeRange(timeRange);
  const duration = useMemo(
    () => (isMultiDay ? getDateRangeDuration(dateRange as IDateRange) : singleDayDuration) || 0,
    [dateRange, isMultiDay, singleDayDuration]
  );
  const durationMeasure = useMemo(
    () => t(isMultiDay ? pluralize(duration, 'day', 'days') : pluralize(duration, 'hour', 'hours')),
    [duration, isMultiDay, t]
  );

  const arr = [
    { key: t(`${isMultiDay ? 'dates' : 'date.singleDate'}`), value: formattedDate },
    { key: t('duration'), value: `${duration} ${durationMeasure}` },
    { key: t('time.pickUpTime'), value: formatHours(Number(pickUp)) },
    { key: t('time.dropOffTime'), value: formatHours(Number(dropOff)) },
  ];

  return (
    <StyledWrapper>
      {arr.map(item => (
        <StyledInfoLine key={item.key}>
          <StyledLabelBold variant='label'>{item.key}</StyledLabelBold>
          <StyledLabel variant='label'>{item.value}</StyledLabel>
        </StyledInfoLine>
      ))}
    </StyledWrapper>
  );
};

export default CartInfo;
