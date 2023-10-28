import { DatePickerInputProps } from '@/components/Common/DatePickerInput/DatePickerInput';
import { DateRangeInputsPickerProps } from '@/components/Common/DateRangeInputs/DateRangeInputs';
import SingleMultiDatePickers from '@/components/Common/SingleMultiDatePickers';
import useValidateField from '@/hooks/useValidateField';
import theme from '@/theme';
import { IDateRangeCalendarInfo } from '@/types/common';
import { Box, ClickAwayListener, Typography, styled } from '@mui/material';
import { noop } from 'lodash';
import { useCallback, useMemo, memo, useTransition, useState, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import DrawerOrPopper from '@/components/Common/DrawerOrPopper/DrawerOrPopper';
import FilterDrawer from './FilterDrawer';

const StyledWrapper = styled(Box)`
  display: flex;
  column-gap: 8px;
`;

const StyledFilterWrapper = styled(Box)`
  width: 100%;

  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const StyledFilterTitle = styled(Typography)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: block;
    text-transform: uppercase;
    width: 100%;
    color: ${theme.palette.customText.secondary};
  }
`;

type Props = {
  name: string;
  className?: string;
  withPrices?: boolean;
  defaultIsMultiDay?: boolean | null;
  calendarInfo?: IDateRangeCalendarInfo;
  onClickWaitlist?: () => void;
  onClickSaveInsideCalendar?: () => void;
  allowWaitlist?: boolean;
  withDateLabel?: boolean;
  popperOffset?: [number, number];
};

const DateFilters = ({
  name: baseName,
  className,
  withPrices = true,
  defaultIsMultiDay = true,
  calendarInfo,
  allowWaitlist,
  onClickSaveInsideCalendar,
  onClickWaitlist,
  withDateLabel = false,
  popperOffset,
}: Props) => {
  const { t } = useTranslation('common');
  const [, startTransition] = useTransition();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMultiDay = useWatch({ name: `${baseName}.isMultiDay`, defaultValue: defaultIsMultiDay });
  const name = isMultiDay ? `${baseName}.dateRange` : `${baseName}.date`;
  const id = anchorEl ? 'simple-popper' : undefined;
  const popperRef = useRef<HTMLDivElement>(null);

  const handleOpenCalendar = useCallback(() => {
    setIsDrawerOpen(true);
    setAnchorEl(anchorEl ? null : popperRef.current);
  }, [anchorEl]);

  const handleCloseCalendar = useValidateField({
    name,
    onValid: () =>
      startTransition(() => {
        setAnchorEl(null);
        setIsDrawerOpen(false);
        onClickSaveInsideCalendar?.();
      }),
  });

  const dateProps: DateRangeInputsPickerProps = useMemo(
    () => ({
      readOnly: true,
      InputProps: {
        onClick: handleOpenCalendar,
        onFocus: noop,
        'aria-describedby': id,
      },
    }),
    [handleOpenCalendar, id]
  );

  return (
    <ClickAwayListener onClickAway={handleCloseCalendar}>
      <StyledWrapper component='section' className={className} ref={popperRef}>
        <StyledFilterWrapper>
          {withDateLabel && (
            <StyledFilterTitle variant='label' fontWeight={600}>
              {t('dates')}
            </StyledFilterTitle>
          )}
          <SingleMultiDatePickers
            name={baseName}
            isMultiDay={isMultiDay}
            start={dateProps}
            end={dateProps}
            singleDate={dateProps as DatePickerInputProps}
          />
        </StyledFilterWrapper>
        <DrawerOrPopper
          popperOffset={popperOffset}
          anchorEl={anchorEl}
          popperId={id}
          handleDrawerClose={handleCloseCalendar}
          isDrawerOpen={isDrawerOpen}>
          <FilterDrawer
            name={name}
            baseName={baseName}
            isMultiDay={isMultiDay}
            withPrices={withPrices}
            onClickBack={handleCloseCalendar}
            onClickSave={handleCloseCalendar}
            calendarInfo={calendarInfo}
            allowWaitlist={allowWaitlist}
            onClickWaitlist={onClickWaitlist}
          />
        </DrawerOrPopper>
      </StyledWrapper>
    </ClickAwayListener>
  );
};

export default memo(DateFilters);
