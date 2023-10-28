import useGetItemAvailability from '@/hooks/api/useGetItemAvailability';
import theme from '@/theme';
import { CloseRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, styled, SvgIcon, Typography } from '@mui/material';
import { endOfMonth, isSameMonth, isWithinInterval, startOfMonth } from 'date-fns';
import { now } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { UnavailableCalendarIcon } from '@/assets';
import { IDateRangeCalendarInfo } from '@/types/common';
import DateSuggestionButton from '../../DateSuggestionButton';
import EmptyState from './EmptyState';
import MonthControl from './MonthControl';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  background: ${theme.palette.customColors.white};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${theme.breakpoints.up('md')} {
    padding: 12px 24px;
    border-radius: 16px;
    width: 605px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
`;

const StyledTitle = styled(Typography)`
  line-height: 26px;
`;

const StyledDatesWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  overflow: scroll;
  padding-top: 16px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

type Props = {
  calendarInfo: IDateRangeCalendarInfo;
  onClose: () => void;
  formBaseName: string;
  isSingleDate: boolean;
};

const AvailableDatesDrawer = ({ calendarInfo, onClose, formBaseName, isSingleDate }: Props) => {
  const { t } = useTranslation('common');
  const [monthReference, setMonthReference] = useState<Date>(startOfMonth(now())); // We set a reference date in the state to be able to filter and compare against the other dates available

  const { singleDayAvailability = [], multiDayAvailability = [] } = useGetItemAvailability({ isSingleDate });

  const filteredDates = useMemo(() => {
    if (isSingleDate) return singleDayAvailability.filter(({ date }) => isSameMonth(date, monthReference));
    return multiDayAvailability.filter(({ dateRange }) => {
      return isWithinInterval(monthReference, {
        start: startOfMonth(new Date(dateRange.start)),
        end: endOfMonth(new Date(dateRange.end)),
      });
    });
  }, [isSingleDate, singleDayAvailability, multiDayAvailability, monthReference]);

  const hasAvailableDates = filteredDates.length;

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledTitle variant='h2'>{t('upcomingAvailableDates')}</StyledTitle>
        <IconButton onClick={onClose}>
          <CloseRounded color='primary' />
        </IconButton>
      </StyledHeader>
      <MonthControl setMonthReference={setMonthReference} monthReference={monthReference} />
      <Divider />
      {hasAvailableDates ? (
        filteredDates.map(dateData => (
          <StyledDatesWrapper key={dateData.id}>
            <DateSuggestionButton
              calendarInfo={calendarInfo}
              data={dateData}
              formBaseName={formBaseName}
              callback={onClose}
            />
          </StyledDatesWrapper>
        ))
      ) : (
        <EmptyState
          icon={<SvgIcon component={UnavailableCalendarIcon} sx={{ fontSize: '73px' }} inheritViewBox />}
          title={t('noDatesAvailable')}
          subTitle={t('pleaseSelectAnotherDate')}
        />
      )}
    </StyledWrapper>
  );
};

export default AvailableDatesDrawer;
