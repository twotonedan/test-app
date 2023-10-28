import theme from '@/theme';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, ButtonBase, List, ListItem, Popover, styled, Typography } from '@mui/material';
import { addMonths, eachMonthOfInterval, format, startOfMonth } from 'date-fns';
import { now } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArrowControl from './ArrowControl';

const StyledMonthControl = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const StyledDropdownHeader = styled(ButtonBase)`
  ${theme.mixins.resetButton}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 4px;
  width: 132px;
  padding: 5px 4px 5px 8px;
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${theme.palette.customColors.lightBlack};
  white-space: nowrap;
  text-transform: capitalize;
`;

const StyledPaper = styled(List)`
  width: 186px;
  padding: 8px !important;
`;

const StyledListItem = styled(ListItem)`
  padding: 4px 4px 4px 8px;
  cursor: pointer;

  :hover {
    background-color: ${theme.palette.customColors.barelyBlue};
  }
`;

const StyledPopper = styled(Popover)`
  & > .MuiPaper-root {
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const StyledItemLabel = styled(Typography)`
  font-size: 14px;
  line-height: 20px;
  margin: 6px auto 6px 0;
  text-transform: capitalize;
`;

const getDateLabel = (date: Date) => format(date, 'MMMM y');

type Props = {
  setMonthReference: Dispatch<SetStateAction<Date>>;
  monthReference: Date;
};

const MonthControl = ({ setMonthReference, monthReference }: Props) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const elementRef = useRef<HTMLButtonElement>(null);
  const uniqueId = uuidv4();
  const nextMonths = useMemo(() => {
    const startOfTodayMonth = startOfMonth(now());
    return eachMonthOfInterval({ start: startOfTodayMonth, end: addMonths(startOfTodayMonth, 12) });
  }, []);

  const handleDropdownClick = useCallback(
    (month: Date) => {
      setMonthReference(month);
      setIsOpenDropdown(false);
    },
    [setMonthReference]
  );

  return (
    <StyledMonthControl>
      <StyledDropdownHeader ref={elementRef} onClick={() => setIsOpenDropdown(prev => !prev)} disableRipple>
        <StyledTypography>{getDateLabel(monthReference)}</StyledTypography>
        <ExpandMoreRounded fontSize='small' />
      </StyledDropdownHeader>
      {/* TO DO Research if it is not possible to use the drodpwn component instead of a Popper. */}
      <StyledPopper
        open={isOpenDropdown}
        anchorEl={elementRef.current}
        onClose={() => setIsOpenDropdown(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <StyledPaper>
          {nextMonths.map(month => (
            <StyledListItem key={uniqueId} onClick={() => handleDropdownClick(month)}>
              <StyledItemLabel variant='label'>{getDateLabel(month)}</StyledItemLabel>
            </StyledListItem>
          ))}
        </StyledPaper>
      </StyledPopper>
      <ArrowControl setMonthReference={setMonthReference} monthReference={monthReference} />
    </StyledMonthControl>
  );
};

export default MonthControl;
