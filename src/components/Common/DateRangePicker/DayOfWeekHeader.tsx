import { Box, styled, Typography } from '@mui/material';
import { addDays, format, startOfWeek } from 'date-fns';
import { now } from 'lodash';
import { useMemo } from 'react';

const StyledDayHeader = styled(Box)`
  display: flex;
  text-transform: uppercase;
  justify-content: space-between;
  background-color: #fff;
`;

const StyledDayOfWeek = styled(Typography)`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  &:first-of-type {
    margin-left: 0;
  }
`;

type Props = {
  className?: string;
};

const DayOfWeekHeader = ({ className }: Props) => {
  const shortWeekDaysArray = useMemo(
    () => [...new Array(7)].map((_, i) => format(addDays(startOfWeek(now()), i), 'EEEEE')),
    []
  );

  return (
    <StyledDayHeader className={className}>
      {shortWeekDaysArray.map((d, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledDayOfWeek key={`day-of-week-${i}`} variant='h4'>
          {d}
        </StyledDayOfWeek>
      ))}
    </StyledDayHeader>
  );
};

export default DayOfWeekHeader;
