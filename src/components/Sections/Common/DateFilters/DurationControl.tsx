import { RangeKeys } from '@/hooks/components/useDateRangePicker';
import usePathError from '@/hooks/usePathError';
import theme from '@/theme';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, css, IconButton, styled, Typography } from '@mui/material';
import { addDays, differenceInCalendarDays, formatDuration, subDays } from 'date-fns';
import { useCallback, useDeferredValue, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { transientOptions } from '@/utils/transientOptions';
import { useTranslation } from 'next-i18next';

const StyledDurationTypography = styled(Typography)`
  color: ${theme.palette.customText.primary};
`;

const StyledDurationWrapper = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const StyledDurationControlsWrapper = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const StyledDurationIconButton = styled(IconButton)`
  padding: 4px;
  color: ${theme.palette.customText.primary};
`;

const StyledDurationControlTypography = styled(Typography, transientOptions)<{ disabled?: boolean }>`
  font-weight: 500;
  user-select: none;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${theme.palette.action.disabled};
    `}
`;

type Props = {
  name: string;
};

const DurationControl = ({ name: baseName }: Props) => {
  const { t } = useTranslation('common');

  const { setValue } = useFormContext();
  const startValue = useWatch({ name: `${baseName}.start`, defaultValue: null });
  const endValue = useWatch({ name: `${baseName}.end`, defaultValue: null });
  const error = usePathError({ name: baseName }) as Record<RangeKeys, unknown> | undefined;
  const deferredError = useDeferredValue(error);

  const { durationSelected, durationOptionsDisabled } = useMemo(() => {
    if (!endValue || !startValue) return { durationSelected: 0, durationOptionsDisabled: true };

    const realDifference = !deferredError ? differenceInCalendarDays(endValue, startValue) + 1 : 0;
    const clampedDifference = Math.max(realDifference || 0, 0);

    return { durationSelected: clampedDifference, durationOptionsDisabled: clampedDifference < 1 };
  }, [endValue, deferredError, startValue]);

  const handleOnClick = useCallback(
    (cb: typeof subDays | typeof addDays) => {
      return () => setValue(`${baseName}.end`, cb(endValue, 1));
    },
    [baseName, endValue, setValue]
  );

  return (
    <StyledDurationWrapper>
      <StyledDurationTypography variant='label'>{t('duration')}</StyledDurationTypography>
      <StyledDurationControlsWrapper>
        <StyledDurationIconButton
          onClick={handleOnClick(subDays)}
          disabled={durationOptionsDisabled || durationSelected <= 2}>
          <ChevronLeft />
        </StyledDurationIconButton>
        <StyledDurationControlTypography variant='label' disabled={durationOptionsDisabled}>
          {formatDuration({ days: durationSelected }, { zero: true })}
        </StyledDurationControlTypography>
        <StyledDurationIconButton onClick={handleOnClick(addDays)} disabled={durationOptionsDisabled}>
          <ChevronRight />
        </StyledDurationIconButton>
      </StyledDurationControlsWrapper>
    </StyledDurationWrapper>
  );
};

export default DurationControl;
