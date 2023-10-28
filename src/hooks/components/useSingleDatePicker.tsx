import { PickersDayProps } from '@mui/x-date-pickers';
import { isSameDay, startOfDay } from 'date-fns';
import { useCallback, useDeferredValue } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { IDateRangeCalendarInfo } from '@/types/common';
import { toUTC } from '@/utils/timezone';
import { RangeKeys } from './useDateRangePicker';
import usePathError from '../usePathError';
import CustomPickersDay from '../../components/Common/CustomPickersDay/CustomPickersDay';

type Props = {
  name: string;
  calendarInfo?: IDateRangeCalendarInfo;
  withPrices?: boolean;
};

const useSingleDatePicker = ({ name, calendarInfo, withPrices }: Props) => {
  const { setValue } = useFormContext();
  const fieldValue = useWatch({ name, defaultValue: null });
  const error = usePathError({ name }) as Record<RangeKeys, unknown> | undefined;
  const deferredFieldValue = useDeferredValue(fieldValue);
  const deferredError = useDeferredValue(error);

  const handleOnChangeCalendar = useCallback(
    (value: Date) => {
      const parsedValue = startOfDay(value);
      setValue(name, parsedValue, { shouldValidate: !!deferredError });
    },
    [deferredError, name, setValue]
  );

  const getDayClassNames = useCallback((isDaySelected: boolean, outsideCurrentMonth: boolean) => {
    const classNames: string[] = [];

    if (outsideCurrentMonth) return classNames;
    if (isDaySelected) classNames.push('Mui-selected');
    return classNames;
  }, []);

  const handleRenderDay = useCallback(
    (currentDay: Date, pickersDayProps: PickersDayProps<unknown>) => {
      // Removing onBlur, onFocus & onKeyDown avoids multiple re-rendering made by MUI Library.
      const { key, onBlur, onFocus, onKeyDown, ...props } = pickersDayProps;
      const { outsideCurrentMonth, disabled } = props;
      const { price, isHoliday, isUnavailable } = calendarInfo?.[toUTC(currentDay).toISOString()] || {};

      const isDaySelected =
        !disabled && !deferredError && !!deferredFieldValue && isSameDay(deferredFieldValue, currentDay);

      const className = !disabled ? getDayClassNames(isDaySelected, outsideCurrentMonth).join(' ') : '';

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
    [calendarInfo, deferredError, deferredFieldValue, getDayClassNames, withPrices]
  );

  return { value: deferredFieldValue, handleOnChangeCalendar, handleRenderDay };
};

export default useSingleDatePicker;
