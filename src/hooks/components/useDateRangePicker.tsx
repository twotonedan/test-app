import { DEFAULT_DATE_SELECTED_RANGE } from '@/constants/default/FILTERS';
import { IDateRangeCalendarInfo } from '@/types/common';
import { PickersDayProps } from '@mui/x-date-pickers';
import {
  endOfDay,
  isAfter,
  isBefore,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameDay,
  isValid,
  isWithinInterval,
  startOfDay,
} from 'date-fns';
import { findKey } from 'lodash';
import { useCallback, useDeferredValue, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { toUTC } from '@/utils/timezone';
import CustomPickersDay from '../../components/Common/CustomPickersDay/CustomPickersDay';
import { useCalendarSelectionData } from '../contexts/useCalendarSelectionData';
import usePathError from '../usePathError';

export type RangeKeys = keyof typeof DEFAULT_DATE_SELECTED_RANGE;

type Props = {
  name: string;
  calendarInfo?: IDateRangeCalendarInfo;
  withPrices?: boolean;
};

/**
 * This hook SHOULD NOT be used inside the `SwiperCalendar` component or similar.
 * It will trigger a re-render when a fieldValue & the error changes, which may re-render all the calendars twice.
 * (And cause a worst performance).
 *
 * When this component is used on the parent, the calendar component (for example `SwiperCalendar`),
 * should be memoized, and just will be re-rendered when its props changes, for example "fieldValue".
 */

const useDateRangePicker = ({ name, calendarInfo, withPrices = true }: Props) => {
  const { setValue } = useFormContext();
  const fieldValue = useWatch({ name, defaultValue: DEFAULT_DATE_SELECTED_RANGE });
  const error = usePathError({ name }) as Record<RangeKeys, unknown> | undefined;
  const deferredFieldValue = useDeferredValue(fieldValue);
  const deferredError = useDeferredValue(error);

  const { isUnavailable: isSelectionUnavailable } = useCalendarSelectionData();

  const selectionIsUnavailable = useMemo(() => {
    const { start, end } = deferredFieldValue;

    try {
      if (deferredError) return false;

      const validDates = [start, end].filter(date => date && isValid(date));

      if (!validDates.length) return false;
      if (validDates.length < 2) return calendarInfo?.[validDates[0]?.toISOString()]?.isUnavailable;
      if (isAfter(start, end)) return false;
      return !!isSelectionUnavailable;
    } catch (_) {
      return false;
    }
  }, [deferredFieldValue, deferredError, calendarInfo, isSelectionUnavailable]);

  const handleOnChangeCalendar = useCallback(
    (value: Date) => {
      const { start } = deferredFieldValue;
      let currentNullKey = findKey(deferredFieldValue, v => v === null) as RangeKeys | undefined;

      if (start && currentNullKey === 'end' && !isAfter(value, start)) {
        currentNullKey = undefined;
      }

      const parsedValue = !currentNullKey || currentNullKey === 'start' ? startOfDay(value) : endOfDay(value);

      setValue(
        name,
        currentNullKey
          ? { ...deferredFieldValue, [currentNullKey]: parsedValue }
          : { ...DEFAULT_DATE_SELECTED_RANGE, start: parsedValue },
        { shouldValidate: !!deferredError }
      );
    },
    [deferredError, deferredFieldValue, name, setValue]
  );

  const getDayClassNames = useCallback(
    (currentDay: Date, outsideCurrentMonth: boolean, currentDaySelectedKey?: string) => {
      const { start, end } = deferredFieldValue;
      const classNames: string[] = [];

      if (outsideCurrentMonth) return classNames;

      if (currentDaySelectedKey) classNames.push('Mui-selected', `Mui-selected-${currentDaySelectedKey}`);

      if (!start || !end || !isBefore(start, end) || !!deferredError) return classNames;

      if (isValid(start) && isValid(end) && isWithinInterval(currentDay, deferredFieldValue as Interval)) {
        classNames.push('Mui-selected-range');

        if (selectionIsUnavailable) classNames.push('Mui-selected-unavailable');
        if (isFirstDayOfMonth(currentDay)) classNames.push('Mui-selected-month-start');
        else if (isLastDayOfMonth(currentDay)) classNames.push('Mui-selected-month-end');
      }

      return classNames;
    },
    [deferredError, deferredFieldValue, selectionIsUnavailable]
  );

  const handleRenderDay = useCallback(
    (currentDay: Date, pickersDayProps: PickersDayProps<unknown>) => {
      // Removing onBlur, onFocus & onKeyDown avoids multiple re-rendering made by MUI Library.
      const { key, onBlur, onFocus, onKeyDown, ...props } = pickersDayProps;
      const { outsideCurrentMonth, disabled } = props;
      const { price, isHoliday, isUnavailable } = calendarInfo?.[toUTC(currentDay).toISOString()] || {};
      const { start, end } = deferredFieldValue;

      const currentDaySelectedKey = findKey(deferredFieldValue, v => !!v && isSameDay(v, currentDay)) as
        | RangeKeys
        | undefined;

      const isDaySelected =
        !!currentDaySelectedKey && !disabled && (currentDaySelectedKey === 'start' || (start && end && !deferredError));

      const className = !disabled
        ? getDayClassNames(currentDay, outsideCurrentMonth, currentDaySelectedKey).join(' ')
        : '';

      return (
        <CustomPickersDay
          key={key}
          isDaySelected={isDaySelected}
          isHoliday={isHoliday}
          isUnavailable={isUnavailable}
          price={price}
          withPrices={withPrices}
          className={className}
          {...props}
        />
      );
    },
    [deferredError, deferredFieldValue, getDayClassNames, calendarInfo, withPrices]
  );

  return { value: deferredFieldValue, handleOnChangeCalendar, handleRenderDay };
};

export default useDateRangePicker;
