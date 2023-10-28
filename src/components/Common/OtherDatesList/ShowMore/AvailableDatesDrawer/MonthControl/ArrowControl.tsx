import theme from '@/theme';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box, IconButton, styled } from '@mui/material';
import { addMonths, differenceInYears, isThisMonth, startOfMonth, subMonths } from 'date-fns';
import { now } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

const StyledWrapper = styled(Box)`
  display: flex;
`;

const StyledArrowButton = styled(IconButton)`
  ${theme.mixins.resetButton}
  color: ${theme.palette.customText.primary};
  padding: 6px;
  pointer-events: auto !important;
`;

type Props = {
  setMonthReference: Dispatch<SetStateAction<Date>>;
  monthReference: Date;
};

const ArrowControl = ({ setMonthReference, monthReference }: Props) => {
  const isReferenceInMinLimit = useMemo(() => isThisMonth(monthReference), [monthReference]);
  const isReferenceInMaxLimit = useMemo(
    () => differenceInYears(monthReference, startOfMonth(now())) >= 1,
    [monthReference]
  );

  const moveMonthFoward = useCallback(
    () => setMonthReference(addMonths(monthReference, 1)),
    [monthReference, setMonthReference]
  );

  const moveMonthBack = useCallback(
    () => setMonthReference(subMonths(monthReference, 1)),
    [monthReference, setMonthReference]
  );

  return (
    <StyledWrapper>
      <StyledArrowButton onClick={moveMonthBack} disabled={isReferenceInMinLimit}>
        <ChevronLeftRounded fontSize='small' />
      </StyledArrowButton>
      <StyledArrowButton onClick={moveMonthFoward} disabled={isReferenceInMaxLimit}>
        <ChevronRightRounded fontSize='small' />
      </StyledArrowButton>
    </StyledWrapper>
  );
};

export default ArrowControl;
